import React, { useEffect, useState } from "react";
import { Checkbox, Input, Layout } from "antd";
import "./List.css";
import Link from "antd/es/typography/Link";
import {
  addTaskToList,
  deleteTaskFromList,
  getListName,
  subscribeToListItems,
  toggleListItem,
} from "../../firebase/functions";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;

interface ListProps {
  id: string | undefined;
}

const List: React.FC<ListProps> = ({ id }) => {
  const [listItems, setListItems] = useState<
    { id: string; text: string; completed: boolean }[] | undefined
  >();
  const [listName, setListName] = useState<string | undefined>();
  const [adding, setAdding] = useState<boolean>(false);
  const [newTask, setNewTask] = useState("");
  const [editMode] = useState(true);

  useEffect(() => {
    if (id !== undefined) {
      getListName(id, setListName).then(() => {
        subscribeToListItems(id, setListItems);
      });
    }
  }, [id]);

  const addItem = (text: string) => {
    addTaskToList(id!, text);
    setAdding(false);
    setNewTask("");
  };

  // const deleteItem = (id: string) => {
  //   // TODO
  //   console.log("DELETE: " + id);
  // };

  // const navigateToList = (id: string) => {
  //   // TODO
  //   console.log(id);
  // };

  return (
    <Content className="content">
      <h1>{listName ?? "Select a list"}</h1>
      <hr />
      {(listItems ?? []).map(function (item) {
        return (
          <>
            <span>
              <Checkbox
                checked={item.completed}
                style={{ paddingTop: "10px", width: "95%" }}
                onChange={() => {
                  toggleListItem(id!, item.id);
                }}
              >
                {item.text}
              </Checkbox>
              {editMode == true ? (
                <DeleteOutlined
                  onClick={() => {
                    deleteTaskFromList(id!, item.id);
                  }}
                  style={{ color: "red" }}
                />
              ) : (
                <></>
              )}
            </span>
            <br />
          </>
        );
      })}
      <div style={{ paddingTop: "10px" }}>
        {adding == false ? (
          <Link
            hidden={listName == undefined ? true : false}
            href="#"
            onClick={() => {
              setAdding(true);
            }}
          >
            Add +
          </Link>
        ) : (
          <Input
            autoFocus
            onBlur={() => {
              setAdding(false);
              setNewTask("");
            }}
            value={newTask}
            onChange={(e) => {
              setNewTask(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            style={{ padding: "0px" }}
            prefix={<PlusOutlined />}
            placeholder="Enter todo"
            variant="borderless"
            onPressEnter={() => {
              addItem(newTask);
            }}
          />
        )}
      </div>
    </Content>
  );
};

export default List;
