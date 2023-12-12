import { Button, Modal, type ModalProps } from "flowbite-react";

interface ModalGuardProps extends ModalProps {
  text: string;
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
  onConfirm: () => void;
}

export default function ModalGuard({
  text = "Are you sure?",
  openModal,
  setOpenModal,
  onConfirm,
  ...props
}: ModalGuardProps) {
  return (
    <Modal
      className="bg-opacity-80"
      style={{
        alignItems: "center",
        display: "flex",
      }}
      popup
      {...{ ...props, show: openModal, size: "md", onClose: () => setOpenModal(false) }}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <i className="fi fi-br-exclamation mx-auto mb-4 text-6xl text-yellow-400 dark:text-yellow-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirm}>
              Confirm
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
