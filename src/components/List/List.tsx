import React from "react";
import { Checkbox, Layout } from "antd";
import type { CheckboxProps } from "antd";
import "./List.css";

const { Content } = Layout;

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const List: React.FC = () => {
  return (
    <Content className="content">
      <h1>To do list</h1>
      <hr />
      <Checkbox style={{ paddingTop: "10px" }} onChange={onChange}>
        Checkbox 1
      </Checkbox>
      <br />
      <Checkbox style={{ paddingTop: "10px" }} onChange={onChange}>
        Checkbox 2
      </Checkbox>
    </Content>
  );
};

export default List;
