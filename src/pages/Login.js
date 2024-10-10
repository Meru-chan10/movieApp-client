import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      retrieveUserDetails(token);
    }
  }, []);

  useEffect(() => {
    setIsActive(email !== '' && password !== '');
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();
    fetch('https://movieapp-api-lms1.onrender.com/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.access) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text: "Welcome to Glamazon"
        });
        setEmail('');
        setPassword('');
      } else if (data.message === "Incorrect email or password") {
        Swal.fire({
          title: "Authentication failed",
          icon: "error",
          text: "Check your login details and try again."
        });
      } else {
        Swal.fire({
          title: "Authentication failed",
          icon: "error",
          text: `${email} does not exist`
        });
      }
    });
  }

  function retrieveUserDetails(token) {
    fetch('https://movieapp-api-lms1.onrender.com/users/details', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
      } else {
        console.error("User  details not found");
      }
    })
    .catch(err => {
      console.error("Failed to retrieve user details:", err);
    });
  }

  return (
    user.id ? 
      <Navigate to="/" /> :
      <>
        <h1 className="my-5 text-center">Login</h1>
        <Form onSubmit={(e) => authenticate(e)} className="form-container"> 
          <Form.Group controlId="userEmail">
            <div style={{ textAlign: 'center' }}>
              <Form.Label className="login-form">Email address</Form.Label>
            </div>
            <Form.Control 
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-field"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Form.Label className="login-form">Password</Form.Label>
            </div>
            <Form.Control 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-field"
            />
          </Form.Group>

          <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive} className="btn-submit">
            Login
          </Button>
        </Form>
        <p className="text-center mb-5">Don't have an account yet? <Link to='/register'>Click here</Link> to Register </p>


      </>
  );
}