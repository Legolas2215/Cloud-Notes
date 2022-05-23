import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'




function Navbar() {

    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
    }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
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
                        <Link className="btn btn-outline-success pr-2" to="/login" type="submit">Login</Link>


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar