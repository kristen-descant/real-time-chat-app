import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export default function RegisterPage() {
  const [showForm, setShowForm] = useState(true);  // Set to true to show the form by default
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    try {
      const response = await api.post('users/signup/', {
        email,
        password,
        display_name: displayName,
      });

      if (response.status === 201) {
        navigate('/signin');
      }
    } catch (err) {
      console.error('Registration error', err);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowForm(!showForm)} type="button" className="btn btn-primary">
        {showForm ? 'Hide' : 'New User? Start Here'}
      </Button>
      <h4>Already have an account? <Link to="/signin">Sign In</Link></h4>
      {showForm && (
        <Form onSubmit={register}>
          <Form.Group controlId="displayName">
            <Form.Control type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          </Form.Group>
          <Button type="submit" className="btn btn-primary">Register</Button>
        </Form>
      )}
    </div>
  );
}

















