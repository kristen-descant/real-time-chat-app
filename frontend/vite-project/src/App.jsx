import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import userData from './data/users.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from './pages/utility';

function App() {
  
  const [allUserData] = useState(userData);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userToMessage, setUsertoMessage] = useState(null);
  const [friendList, setFriendsList] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState(null);

  const whoAmI = async() => {
    setToken(localStorage.getItem("token"))
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get('http://127.0.0.1:8000/users/info/')
      
      // console.log(respone.data)
      if (response.data.email) {
        setUser(response.data);
      }else {
        navigate('/signin')
      }
      console.log(response)
  }
}

  const getUserInfo = async()  => {
    let thisUser = await api.get('users/profile/')
    setUserInfo(thisUser);
    console.log(thisUser)
    let listOfFriends = thisUser.data.friends
    setFriendsList(listOfFriends)
    console.log(listOfFriends)
  }

  useEffect(()=>{
    whoAmI()
  }, [])

  useEffect(() => {
    getUserInfo();
  }, [user])
  

  return (
    <div className="h-full w-full bg-color_palette_3 overflow-x-hidden">
      {loggedIn  &&
      <Navbar setUser={setUser} setLoggedIn={setLoggedIn}/>}
      <Outlet 
      context={{
        token,
        allUserData,
        user,
        setUser,
        userToMessage,
        setUsertoMessage,
        setLoggedIn,
        userInfo,
        friendList
      }}
      />
    </div>
  );
}

export default App;
