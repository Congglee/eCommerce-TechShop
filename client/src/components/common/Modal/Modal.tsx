import { useDispatch } from "react-redux";
import { showModal } from "../../../features/app.slice";

interface modalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: modalProps) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="fixed top-0 left-0 right-0 z-50 w-full p-5 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-black/70 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Modal;
