import { Layout } from "antd";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import List from "./components/List/List";
import { useEffect, useState } from "react";
import { getFirstListID } from "./firebase/functions";

const App: React.FC = () => {
  const [listID, setListID] = useState<string | undefined>();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setListID(await getFirstListID());
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

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
