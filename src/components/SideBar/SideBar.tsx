import React from "react";
import { Layout, Menu } from "antd";
import "./SideBar.css";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  return (
    <Sider width={150}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        className="menu"
      >
        <Menu.Item title="" key="0" style={{ paddingLeft: "15px" }}>
          Groceries
        </Menu.Item>
        <Menu.Item title="" key="1" style={{ paddingLeft: "15px" }}>
          Bucket list
        </Menu.Item>
        <Menu.Item
          title=""
          style={{
            position: "absolute",
            width: "fit-content",
            padding: "17px",
            bottom: 0,
            zIndex: 1,
            transition: "all 0.2s",
          }}
          key="999"
        >
          +
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
