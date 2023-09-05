
import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export default function SignInPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('users/login/', {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        navigate('/');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/">Go back to Home</Link>
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
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
        <Button onClick={logIn} disabled={loading} type="button" className="btn btn-success">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <h4>
          <Link to="/register">Need an Account?</Link>
        </h4>
      </div>
    </div>
  );
}









