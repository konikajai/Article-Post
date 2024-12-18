import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:5002/users');
            const users = response.data;

            const user = users.find((u) => u.email === email);
            if (user) {
                const verified = await bcrypt.compare(password, user.password); 
                if (verified) {
                    const token = jwt.sign({
                        email : user.email,
                        id : user.id
                    },)
                    alert('Login Successful!');
                    navigate('/Profile');
                } else {
                    alert('Invalid password. Please try again.');
                }
            } else {
                alert('User not found. Please check your email.');
            }
        } catch (err) {
            console.error('Login Failed', err);
            alert('An error occurred during login. Please try again later.');
        }
    };

    return (
        <>
            <h1>Login Page</h1>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Login</button>
        </>
    );
};

export default Login;
