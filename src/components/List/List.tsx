import React, { useEffect, useState } from "react";
import { Checkbox, Input, Layout, Switch } from "antd";
import "./List.css";
import Link from "antd/es/typography/Link";
import {
  addTaskToList,
  deleteTaskFromList,
  getListName,
  subscribeToListItems,
  toggleListItem,
  updateListName,
} from "../../firebase/functions";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;

interface ListProps {
  id: string | undefined;
  editMode: boolean;
  toggleEditMode: () => void;
}

const List: React.FC<ListProps> = ({ id, editMode, toggleEditMode }) => {
  const [listItems, setListItems] = useState<
    { id: string; text: string; completed: boolean }[] | undefined
  >();
  const [listName, setListName] = useState<string | undefined>();
  const [adding, setAdding] = useState<boolean>(false);
  const [newTask, setNewTask] = useState("");
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      getListName(id, setListName).then(() => {
        subscribeToListItems(id, setListItems);
      });
      getListName(id, setNewListName);
    } else {
      setListName("Loading...");
    }
  }, [id]);

  const addItem = (text: string) => {
    if (text === "" || text === undefined) {
      return;
    }
    addTaskToList(id!, text);
    setNewTask("");
  };

  return (
    <Content className="content">
      {editMode == false ? (
        <h1>{listName ?? "Loading"}</h1>
      ) : (
        <Input
          style={{ padding: 0, fontSize: "25px", fontWeight: "bold" }}
          size="large"
          value={newListName}
          variant="borderless"
          onChange={(e) => {
            setNewListName(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            );
          }}
          onPressEnter={() => {
            updateListName(id!, newListName);
            toggleEditMode();
            setListName(newListName);
          }}
        />
      )}
      <hr />
      {(listItems ?? []).map(function (item) {
        return (
          <>
            <span>
              <Checkbox
                checked={item.completed}
                disabled={editMode ? true : false}
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
            hidden={
              listName == undefined || editMode == true || id == undefined
                ? true
                : false
            }
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
                e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1),
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
      <Switch
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: "10px",
          backgroundColor: editMode ? "red" : "lightGrey",
        }}
        checkedChildren="EDIT"
        unCheckedChildren=""
        defaultChecked={false}
        onChange={() => {
          toggleEditMode();
          setNewListName(listName!);
        }}
      />
    </Content>
  );
};

export default List;
