import { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Footer, Header } from "../components/guest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreenWidth } from "../features/app.slice";
import icons from "../utils/icons";
import { RootState } from "../store/store";
import { Modal } from "../components/common";

const { BsCaretUpFill } = icons;

const ClientLayout = () => {
  const { isShowModal, modalChildren } = useSelector(
    (state: RootState) => state.app
  );

  const { pathname, search } = useLocation();
  const [currentWidth, setCurrentWidth] = useState(screen.width);
  const [visible, setVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const [prevPage, setPrevPage] = useState("");
  const dispatch = useDispatch();

  const setWidth = (e: any) => {
    setCurrentWidth(e.target.screen.width);
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  const scrollToTopToggle = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    dispatch(setCurrentScreenWidth({ width: currentWidth }));
  }, [currentWidth]);

  useEffect(() => {
    if (pathname !== "/") {
      scrollToTop();
    }
  }, [pathname]);

  useEffect(() => {
    const currentPage = searchParams.get("page");

    if (prevPage !== currentPage) {
      scrollToTop();
      setPrevPage(currentPage as string);
    }
  }, [search, prevPage]);

  return (
    <div className="font-Inter w-full max-w-full">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-[15px]"
      />
      <Outlet />

      {isShowModal && <Modal>{modalChildren}</Modal>}

      <div
        className={`fixed right-[10px] bottom-[10px] bg-[#A0A0A0] w-10 h-10 text-white rounded-md cursor-pointer transition-all duration-500 ease-in hover:bg-main-200 items-center justify-center ${
          visible ? "flex" : "hidden"
        }`}
        onClick={scrollToTopToggle}
      >
        <BsCaretUpFill size={18} />
      </div>

      <Footer />
    </div>
  );
};

export default ClientLayout;
