import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import userData from './data/users.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  
  const [allUserData] = useState(userData);
  const [user, setUser] = useState(null);
  const [userToMessage, setUsertoMessage] = useState(null);
  const navigate = useNavigate();

  const whoAmI = async() => {
    let token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`
      let respone = await axios.get('http://127.0.0.1:8000/users/info/')
      // console.log(respone.data)
      setUser(respone.data)
      navigate('/')
    } else {
      setUser(null)
      navigate("/signin")
    }
  }
  useEffect(()=>{
    whoAmI()
  }, [])
  
  console.log(user)
  return (
    <div className="h-full w-full bg-color_palette_3 overflow-x-hidden">
      <Navbar/>
      <Outlet 
      context={{
        allUserData,
        user,
        setUser,
        userToMessage,
        setUsertoMessage
      }}
      />
    </div>
  );
}

export default App;
