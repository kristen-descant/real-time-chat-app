import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import userData from './data/users.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from './pages/utility';
import { useRef } from 'react';
import { useLocation } from "react-router-dom";

function App() {
  
  const [allUserData] = useState(userData);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userToMessage, setUsertoMessage] = useState(null);
  const [friendList, setFriendsList] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const lastVisited = useRef();
  const location = useLocation();
  const [friendStatusChange, setFriendStatusChange] = useState(true);
  const [chatDeleted, setChatDeleted] = useState(false)
  const [messages, setMessages] = useState(null);
  const [chatRooms, setChatRooms] = useState(null);
  const [counter, setCounter] = useState(0)
  

  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("users/info/");
      // Check if the response contains the user data (email field exists)
      if (response.data.email) {
        setUser(response.data);
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/");
        }
      }

    } else {
      // If no token is found, navigate to the login page

      navigate("/register");
    }
  };

    useEffect(() => {
      whoAmI();
      console.log(loggedIn)
    }, []);

    useEffect(() => {
      if (!user) {
        // If the user is not authenticated, update the lastVisited ref with the current location pathname
        lastVisited.current = location.pathname;
      }
    }, [location]);

  const getUserInfo = async()  => {
    if (user ){
    let thisUser = await api.get('users/profile/')
    setUserInfo(thisUser);
    // console.log(thisUser)
    let listOfFriends = thisUser.data.friends
    setFriendsList(listOfFriends)
    // console.log(listOfFriends)
    }
  }

  const getChats = async() => {
    try {
        console.log(api.defaults.headers.common)
        const response = await api.get('chat/')
        console.log(response)
        const messages = response.data
        console.log(messages)
        setChatRooms(messages)
    } catch(error) {
        console.log(error)
    }
}

useEffect(() => {
    getChats();
    setChatDeleted(false);
}, [user, chatDeleted, userToMessage])

  useEffect(()=>{
    whoAmI()
  }, [])

  useEffect(() => {
    getUserInfo();
  }, [user, friendStatusChange])
  

  return (
    <div className="h-full w-full bg-color_palette_3 overflow-x-hidden">
      {loggedIn  &&
      <Navbar setUser={setUser} setLoggedIn={setLoggedIn} userInfo={userInfo}/>}
      <Outlet 
      context={{
        allUserData,
        user,
        setUser,
        userToMessage,
        setUsertoMessage,
        setLoggedIn,
        userInfo,
        friendList,
        friendStatusChange,
        setFriendStatusChange,
        messages,
        setMessages,
        chatDeleted,
        setChatDeleted,
        chatRooms,
        setChatRooms,
        counter,
        setCounter 
   
      }}
      />
    </div>
  );
}

export default App;
