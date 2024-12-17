import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = () => {

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    function handleLogout() {
        navigate("/Login")
        localStorage.removeItem("token")
        alert("Logout Successfull!")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <NavLink to="/">Home</NavLink>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <NavLink to="/Profile">My Profile</NavLink>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <NavLink to="/SavedArticles">My Saved Articles</NavLink>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <NavLink to="/SignUp">SignUp</NavLink>
                                </a>
                            </li>
                            {!token ?
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        <NavLink to="/Login">Login</NavLink>
                                    </a>
                                </li> :
                                <li className="nav-item">
                                    <button
                                        className="nav-link active btn btn-link"
                                        onClick={handleLogout}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        Logout
                                    </button>
                                </li>}

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar