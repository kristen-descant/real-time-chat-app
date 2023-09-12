import axios from "axios";
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { api } from './utility';
import logo from "../media/ClearLogo.png"

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const navigate = useNavigate();
  const {setLoggedIn, setUser} = useOutletContext();

  const register = async (e) => {
    e.preventDefault();

    if (email === '') {
      window.alert("Email cannot be empty.")
      return
    }
    if (password === '') {
      window.alert("Password cannot be empty.")
      return
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      let response = await api.post("users/register/", {
        email: email,
        password: password,
        display_name: displayName,  
      });

      console.log(response);
      
      if (response.status === 201) {
        let token = response.data.token;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        console.log("Registration successful!");
        setLoggedIn(true);
        setUser(response.data)
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error", error);
      if (error.message === 
        "Request failed with status code 500") {
          window.alert("A user with that display name or email address already exist.")
        }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative"> 
      <div className="flex flex-col items-center relative">  
        <div>
          <img src={logo}/>
        </div> 
        <div className="absolute bottom-[-8%] flex flex-col items-center">
          <div className="mb-2 text-center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
          <div className="mb-1">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"  
              className="text-center"
            />
          </div>
          <div className="mb-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            className="text-center"
            />
          </div>
          <div className="mb-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-center"
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="text-center"
            />
          </div>
          <button onClick={register} type="button" className="mt-2 border hover:bg-color_palette_4 border-[white] text-[white] p-1 rounded mb-2 ">
          <i className="fa-sharp fa-solid fa-user fa-lg"></i> Register
          </button>
        </div>
      </div>
    </div>
  );
};

