import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { api } from './utility';
import logo from '../media/ClearLogo.png'
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setLoggedIn, setUser, user} = useOutletContext();
  
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
     
      let response = await api.post("users/login/", {
        email: email,
        password: password,
      });
      
      if (response.status === 200 && response.data.token) {
        let token = response.data.token;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        setLoggedIn(true);
        setUser(response.data)
        console.log("Navigating to home...");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      window.alert("Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center relative">
        <div className="">
          <img src={logo} />
        </div>
        <div className="absolute bottom-[3%] flex flex-col items-center">
          <div className="mb-2 text-center">
            Need an account? <Link to="/register">Register</Link>
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-1 text-center"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-center"
            />
          </div>
          <button onClick={logIn} disabled={loading} type="button" className="border mt-2 hover:bg-color_palette_4 border-[white] text-[white] p-1 rounded mb-2 ">
          <i className="fa-sharp fa-solid fa-user fa-lg"></i>  {loading ? "Signing in..." : " Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

