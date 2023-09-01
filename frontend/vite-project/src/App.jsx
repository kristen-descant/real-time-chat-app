import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import userData from './data/users.json'






function App() {
  
  const [allUserData] = useState(userData);
  const [user, setUser] = useState(null);
  const [userToMessage, setUsertoMessage] = useState(null);

  const setUsers = () => {
    const user1 = allUserData.find((user) => (
      user["id"] === 1
    ));
    const user2 = allUserData.find((user) => (
      user["id"] === 2
    ));

    setUser(user1);
    setUsertoMessage(user2);
  }

  useEffect(() => {
    setUsers()
  }, []);

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
