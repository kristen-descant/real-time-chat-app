import axios from "axios";
import React, { useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
     
      localStorage.removeItem("token");
      api.defaults.headers.common["Authorization"] = undefined;

      console.log("Logged out successfully");

      navigate("/signin");

    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div>
      <Alert variant="info">Logging out...</Alert>
      <Button onClick={logout} type="button" className="btn btn-warning">Logout Manually</Button>
    </div>
  );
};
