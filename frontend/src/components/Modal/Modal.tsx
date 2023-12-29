import "./Modal.css";

interface ModalGuardProps {
  type?: "warning" | "error" | "success" | "info";
  text: string;
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
  onConfirm: () => void;
}

export default function Modal({
  type = "info",
  text = "Are you sure?",
  openModal,
  setOpenModal,
  onConfirm,
}: ModalGuardProps) {
  const handleConfirm = () => {
    onConfirm();
    setOpenModal(false);
  };
  const closeModal = () => setOpenModal(false);

  const getIconType = type => {
    switch (type) {
      case "warning":
        return <i className="fi fi-sr-triangle-warning self-center text-6xl text-amber-400" />;
      case "error":
        return <i className="fi fi-sr-times-hexagon self-center text-6xl text-red-400" />;
      case "success":
        return <i className="fi fi-sr-check-circle self-center text-6xl text-green-400" />;
      case "info":
        return <i className="fi fi-sr-info self-center text-6xl text-blue-400" />;
    }
  };

  return (
    openModal && (
      <div
        className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
        onClick={closeModal}
      >
        <section
          className="absolute flex h-fit w-2/4 flex-col justify-between gap-y-10 rounded-xl bg-slate-700 p-4 text-gray-300"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <article className="mt-6 flex flex-col gap-2">
            {getIconType(type)}
            <p className="px-4 text-center text-xl">{text}</p>
          </article>
          <footer className="flex justify-center gap-x-8">
            <button onClick={handleConfirm}>Ok</button>
            <button className="hover:bg-red-700/[.125]" onClick={closeModal}>
              Cancel
            </button>
          </footer>
        </section>
      </div>
    )
  );
}
