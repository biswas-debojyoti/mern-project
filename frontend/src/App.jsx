import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />

      {/* <div className="h-screen bg-green-700 text-white flex items-center justify-center text-5xl font-bold">
        TAILWIND v4 WORKING ✅
      </div> */}
    </>
  );
};

export default App;
