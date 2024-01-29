import React, { useEffect, useState } from "react";
import { Checkbox, Layout } from "antd";
import "./List.css";
import Link from "antd/es/typography/Link";
import {
  getListName,
  subscribeToListItems,
  toggleListItem,
} from "../../firebase/functions";

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
      getListName(id, setListName).then(() => {
        subscribeToListItems(id, setListItems);
      });
    }
  }, [id]);

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
      {(listItems ?? []).map(function (item) {
        return (
          <>
            <Checkbox
              checked={item.completed}
              style={{ paddingTop: "10px" }}
              onChange={() => {
                toggleListItem(id!, item.id);
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
