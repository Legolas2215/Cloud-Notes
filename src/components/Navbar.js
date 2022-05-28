import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'




function Navbar() {
    const navigate = useNavigate();
    let location = useLocation();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Cloud Notebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className={`nav-link ${location ==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location ==="/notes"?"active":""}`} to="/notes">Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location ==="/aboutus"?"active":""}`} to="/aboutus">About Us</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token') ?<span><Link className="btn btn-outline-success pr-2 mx-1" to="/login" type="submit">Login</Link>
                        <Link className="btn btn-outline-success pr-2" to="/signup" type="submit">Signup</Link></span>: <button className="btn btn-outline-success pr-2 mx-1" onClick={handleLogout}>Logout</button> }
                        


                    </div>
                </div>
            </nav>
            
        </div>
    )
}

export default Navbar