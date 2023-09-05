import React, { useState } from "react";
import { Link } from "react-router-dom";
import FriendsList from "../components/FriendsList";
import ForumsList from "../components/ForumList";
import RegisterPage from "./RegisterPage";
import SignInPage from "./SignInPage";

export default function HomePage() {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleHomeClick = () => {
    setShowSignInForm(false);
    setShowRegisterForm(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-around items-start h-20 mb-10"> 
        <Link to="/" onClick={handleHomeClick}>
          <h2 className="mr-4">Home</h2> 
        </Link>
        <div className="mr-4"> 
          <h2 onClick={() => setShowSignInForm(!showSignInForm)}>SignIn</h2>
          <SignInPage showForm={showSignInForm} setShowForm={setShowSignInForm} />
        </div>
        <div className="mr-4"> 
          <h2 onClick={() => setShowRegisterForm(!showRegisterForm)}>Register</h2>
          <RegisterPage showForm={showRegisterForm} setShowForm={setShowRegisterForm} setShowSignInForm={setShowSignInForm} />
        </div>
      </div>
      <div className="flex flex-row justify-around mt-10">
        <ForumsList />
        <FriendsList />
      </div>
    </div>
  );
}











