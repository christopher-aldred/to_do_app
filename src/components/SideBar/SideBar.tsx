import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./SideBar.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  deleteCollection,
  subscribeToCollections,
} from "../../firebase/functions";

const { Sider } = Layout;

interface SideBarProps {
  currentListID: string | undefined;
  setListID: (id: string) => void;
  addNewList: () => void;
  editMode: boolean;
  goToFirstList: () => void;
  turnOffEditMode: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  currentListID,
  setListID,
  addNewList,
  editMode,
  goToFirstList,
  turnOffEditMode,
}) => {
  const [lists, setLists] = useState<{ name: string; id: string }[]>();

  useEffect(() => {
    subscribeToCollections(setLists);
  }, []);

  const deleteList = (id: string) => {
    if (currentListID === id) {
      deleteCollection(id).then(() => {
        goToFirstList();
      });
    } else {
      deleteCollection(id);
    }
    turnOffEditMode();
  };

  return (
    <Sider width={150}>
      <Menu mode="inline" defaultSelectedKeys={["0"]} className="menu">
        {lists?.map(function (item, index) {
          return (
            <>
              <Menu.Item
                title=""
                icon={
                  editMode ? <DeleteOutlined style={{ color: "red" }} /> : <></>
                }
                key={index.toString()}
                style={{ paddingLeft: "15px" }}
                onClick={() => {
                  editMode ? deleteList(item.id) : setListID(item.id);
                }}
              >
                {item.name}
              </Menu.Item>
            </>
          );
        })}

        <Menu.Item
          title=""
          style={{
            position: "absolute",
            width: "fit-content",
            padding: "15px",
            bottom: 0,
            zIndex: 1,
            transition: "all 0.2s",
          }}
          key="999"
          onClick={addNewList}
        >
          <PlusOutlined />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
