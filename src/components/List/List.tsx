import React, { useEffect, useState } from "react";
import { Checkbox, Layout } from "antd";
import "./List.css";
import Link from "antd/es/typography/Link";
import { getListName, subscribeToListItems } from "../../firebase/functions";

const { Content } = Layout;

interface ListProps {
  id: string | undefined;
}

const List: React.FC<ListProps> = ({ id }) => {
  const [listItems, setListItems] = useState<
    { id: string; text: string; completed: boolean }[] | undefined
  >();
  const [listName, setListName] = useState<string>("TEST");

  useEffect(() => {
    if (id !== undefined) {
      getListName(id, setListName);
      subscribeToListItems(id, setListItems);
    }
  }, [id]);

  const toggleItem = (index: number) => {
    // TODO
    const tempItems = [...listItems!];
    tempItems[index].completed = !tempItems[index].completed;
    setListItems(tempItems);
  };

  const addItem = (text: string) => {
    // TODO
    console.log("ADD: " + text);
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
      <h1>{listName}</h1>
      <hr />
      {(listItems ?? []).map(function (item, index) {
        return (
          <>
            <Checkbox
              checked={item.completed}
              style={{ paddingTop: "10px" }}
              onChange={() => {
                toggleItem(index);
              }}
            >
              {item.text}
            </Checkbox>
            <br />
          </>
        );
      })}
      <div style={{ paddingTop: "10px" }}>
        <Link
          href="#"
          onClick={() => {
            addItem("TEST");
          }}
        >
          Add +
        </Link>
      </div>
    </Content>
  );
};

export default List;
