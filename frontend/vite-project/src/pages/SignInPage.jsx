import axios from "axios";
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/' 
});

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("users/login/", {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200 && response.data.token) {
        let token = response.data.token;
        let user = response.data.user;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        console.log(user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error", error);
     
    }
  };

  return (
    <div>
      <Button onClick={logIn} type="button" className="btn btn-success">Signin</Button>
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
}
