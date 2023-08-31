import axios from "axios";
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      let response = await api.post("users/register/", {
        email: email,
        password: password,
      });

      console.log(response);
      
      if (response.status === 201) {
        console.log("Registration successful!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </div>
      <Button onClick={register} type="button" className="btn btn-primary">Register</Button>
      <div>
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
};