import { Outlet, useOutletContext } from "react-router-dom";
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
  const [loggedIn, setLoggedIn] = useState(false)

  const whoAmI = async() => {
    let token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await axios.get('http://127.0.0.1:8000/users/info/')
      // console.log(respone.data)
      if (response.data.email) {
        setUser(response.data);
      }else {
        navigate('/signin')
      }
      console.log(response)
  }
}
  useEffect(()=>{
    whoAmI()
  }, [])
  
  console.log(user)
  return (
    <div className="h-full w-full bg-color_palette_3 overflow-x-hidden">
      {loggedIn  &&
      <Navbar setUser={setUser} setLoggedIn={setLoggedIn}/>}
      <Outlet 
      context={{
        allUserData,
        user,
        setUser,
        userToMessage,
        setUsertoMessage,
        setLoggedIn
      }}
      />
    </div>
  );
}

export default App;
