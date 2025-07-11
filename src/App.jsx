import { Outlet } from "react-router-dom";
import NavBar from "./components/clients/navbar/NavBar";
import Footer from "./components/clients/footer/Footer";
const App = () => {
  return (
    <>
     <div>
      <NavBar/>
      <div className="mt-4">
      <Outlet />
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default App