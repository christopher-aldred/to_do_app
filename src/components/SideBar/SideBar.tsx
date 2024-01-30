import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "./SideBar.css";
import { PlusOutlined } from "@ant-design/icons";
import { subscribeToCollections } from "../../firebase/functions";

const { Sider } = Layout;

interface SideBarProps {
  setListID: (id: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setListID }) => {
  const [lists, setLists] = useState<{ name: string; id: string }[]>();

  useEffect(() => {
    subscribeToCollections(setLists);
  }, []);

  return (
    <Sider width={150}>
      <Menu mode="inline" defaultSelectedKeys={["0"]} className="menu">
        {lists?.map(function (item, index) {
          return (
            <>
              <Menu.Item
                title=""
                key={index}
                style={{ paddingLeft: "15px" }}
                onClick={() => {
                  setListID(item.id);
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
        >
          <PlusOutlined />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
