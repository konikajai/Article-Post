import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = () => {
        axios.get('http://localhost:5002/users')
            .then((response) => {
                const users = response.data
                const user = users.find((u) => u.email === email && u.password === password)

                if (user) {
                    localStorage.setItem("token", user.token) // Save token to localStorage
                    alert("Login Successful!") // Success message
                    navigate("/Profile") // Redirect to Profile page
                } else {
                    alert("Invalid email or password. Please try again.") // Alert for incorrect credentials
                }
            })
            .catch((err) => {
                console.log("Login Failed", err)
                alert("Login Failed") // General login failure message
            })
    }

    return (
        <>
            <h1>Login Page</h1>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input
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
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <button onClick={handleSubmit}>Login</button>
        </>
    )
}

export default Login
