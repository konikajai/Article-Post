import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/users?email=${email}`);

      if (response.data.length > 0) {
        alert('Email already exists! Please use a different email.');
        return;
      }

      const token = `token-${email}-${Date.now()}`;

      const newUser = {
        email,
        password, 
        token,
        savedArticles: []
      };

      await axios.post("http://localhost:5002/users", newUser);
      console.log(newUser);
      
      alert('Sign Up Successful');
      navigate('/Login');
    }
    catch (error) {
      console.error('Sign Up Failed:', error);
      alert('Sign Up Failed. Please try again.');
    }
  };

  return (
    <>
      <h1>Signup Page</h1>
      <div className="mb-3 row">
        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control-plaintext"
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            required
          />
        </div>
      </div>

      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
};

export default SignUp;
