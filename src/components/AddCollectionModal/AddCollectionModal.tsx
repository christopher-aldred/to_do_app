import { Button, Input, InputRef } from "antd";
import Modal from "antd/es/modal/Modal";
import { useRef, useState } from "react";
import { addCollection } from "../../firebase/functions";

interface ModalProps {
  shouldShow: boolean;
  closeModal: () => void;
  setListID: (id: string) => void;
}

const AddCollectionModal: React.FC<ModalProps> = ({
  shouldShow,
  closeModal,
  setListID,
}) => {
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const inputRef = useRef<InputRef | null>(null);

  const handleCancel = async () => {
    closeModal();
    setInputName("");
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleOk();
    }
  };

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    // let error: boolean = false;
    if (inputName !== "") {
      const newListID = await addCollection(inputName);
      setListID(newListID);
    }
    // else {
    //   error = true;
    // }

    setTimeout(() => {
      setSubmitBtnLoading(false);
      closeModal();
      setInputName("");
      /*
      if (error === true) {
        props.displayError("Must enter a user name");
      } else {
        props.displaySuccess("User added");
      }
      */
    }, 1000);
  };

  return (
    <Modal
      centered
      title="Add list"
      open={shouldShow}
      onCancel={handleCancel}
      afterOpenChange={() => {
        inputRef.current!.focus();
      }}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitBtnLoading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Input
        style={{ width: "100%" }}
        placeholder="Enter name"
        value={inputName}
        onChange={(e) => {
          setInputName(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
          );
        }}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
    </Modal>
  );
};

export default AddCollectionModal;
