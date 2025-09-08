import { RxCross2 } from "react-icons/rx";
import { Button } from "../../buttons";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  children,
  description,
}) => {
  if (!isOpen) return null;
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const handleModalConfirm = async () => {};

  //   const handleModalClose = () => {
  //     setIsModalOpen(false);
  //   };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[1005]">
      <div className="max-w-md relative bg-white p-4 rounded-md shadow-lg">
        <h4>{title}</h4>
        {children ? children : <p className="mb-4">{description}</p>}
        <div className="flex justify-end gap-4">
          <Button onClick={onConfirm} mainPrimary={true} isLoading={loading}>
            Yes
          </Button>
          <Button outLine={true} onClick={onClose}>
            Cancel
          </Button>
        </div>
        <button className="absolute top-2 right-2" onClick={onClose}>
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};
