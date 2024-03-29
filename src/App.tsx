import { Layout } from "antd";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import List from "./components/List/List";
import { useEffect, useState } from "react";
import { addCollection, getFirstListID } from "./firebase/functions";
import AddCollectionModal from "./components/AddCollectionModal/AddCollectionModal";

const App: React.FC = () => {
  const [listID, setListID] = useState<string | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  useEffect(() => {
    const fetchData = async () => {
      setListID(await getFirstListID());
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Layout className="centerBox">
        <SideBar
          currentListID={listID}
          setListID={setListID}
          addNewList={() => {
            setShowModal(true);
          }}
          editMode={editMode}
          goToFirstList={async () => {
            setListID(
              (await getFirstListID()) ??
                (await addCollection("My first list")),
            );
          }}
          turnOffEditMode={() => {
            setEditMode(false);
          }}
        />
        <List id={listID} editMode={editMode} toggleEditMode={toggleEditMode} />
        <AddCollectionModal
          shouldShow={showModal}
          closeModal={() => {
            setShowModal(false);
          }}
          setListID={setListID}
        />
      </Layout>
    </>
  );
};

export default App;
