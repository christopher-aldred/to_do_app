import React from "react";
import { Layout, Menu, theme } from "antd";
import "./App.css";

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout
        className="centerBox"
        style={{
          overflow: "hidden",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Sider
          style={{
            background: colorBgContainer,
          }}
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
            }}
          >
            <Menu.Item title="" key="0">
              First
            </Menu.Item>
            <Menu.Item title="" key="1">
              Second
            </Menu.Item>
            <Menu.Item
              title=""
              style={{
                position: "absolute",
                width: "fit-content",
                padding: "20px",
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
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <h1>To do list</h1>
        </Content>
      </Layout>
    </>
  );
};

export default App;
