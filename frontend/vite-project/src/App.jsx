import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";






function App() {
  

  return (

    <div className="h-screen w-screen bg-color_palette_3">
      <Navbar/>
     

      <Outlet />
    </div>
  );
}

export default App;
