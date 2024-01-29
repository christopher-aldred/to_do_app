import { Layout } from "antd";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import List from "./components/List/List";
import { useState } from "react";

const App: React.FC = () => {
  const [listID, setListID] = useState<string | undefined>(
    "QyLfE3fqqeJ8fxCy7iw6"
  );

  return (
    <>
      <Layout className="centerBox">
        <SideBar setListID={setListID} />
        <List id={listID} />
      </Layout>
    </>
  );
};

export default App;
