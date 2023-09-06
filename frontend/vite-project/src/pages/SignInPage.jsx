import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { api } from './utility';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setLoggedIn, setUser, user} = useOutletContext();
  
  const navigate = useNavigate();

  const checkIfUser = () => {
    if (user) {
      navigate('/')
    }
  }

  useEffect(() => {
    checkIfUser();
  }, [])

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
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button onClick={logIn} disabled={loading} type="button" className="btn btn-success">
        {loading ? "Signing in..." : "Signin"}
      </Button>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
    </div>
  );
};

