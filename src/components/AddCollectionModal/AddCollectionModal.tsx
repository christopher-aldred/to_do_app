import { Button, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { addCollection } from "../../firebase/functions";

interface ModalProps {
  shouldShow: boolean;
  closeModal: () => void;
}

const AddCollectionModal: React.FC<ModalProps> = ({
  shouldShow,
  closeModal,
}) => {
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleCancel = async () => {
    closeModal();
    setInputName("");
  };

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    // let error: boolean = false;
    if (inputName !== "") {
      addCollection(inputName);
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
        onChange={(value) => {
          setInputName(value.target.value);
        }}
      />
    </Modal>
  );
};

export default AddCollectionModal;
