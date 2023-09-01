import React from 'react'
import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });
  


function Utilities() {
  return (
    <div>Utilities</div>
  )
}

export default Utilities