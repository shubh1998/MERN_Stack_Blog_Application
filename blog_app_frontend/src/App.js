import AppRoutes from "routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOADER_TYPE } from "utils/constants/index";
import { useSelector } from "react-redux";
import AppLoader from "components/AppLoader/AppLoader";

function App() {
  const { pageLoader } = useSelector((state) => state.loader)

  return (
    <>
      {
        pageLoader &&
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 1
        }}>
          <AppLoader variant={LOADER_TYPE.SCALE} />
        </div>
      }
      <div style={{ filter: pageLoader ? 'blur(5px)' : 'none' }}>
        <ToastContainer
          theme="colored"
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ fontSize: "15px", fontWeight: 800 }}
        />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
