import React from "react";
import { Layout } from "antd";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import List from "./components/List/List";

const App: React.FC = () => {
  return (
    <>
      <Layout className="centerBox">
        <SideBar />
        <List />
      </Layout>
    </>
  );
};

export default App;
