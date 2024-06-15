import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"
import Logo from '../../src/images/company.png'


const Navbar = (props) => {
    const navigate = useNavigate()
    const cardata = localStorage.getItem("itemscart")
    console.log("cardata", cardata)


    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img src="https://ci3.googleusercontent.com/meips/ADKq_NYF88jmgD1a83f_reEuEQ1QygIpzKPMA3Nr_0vTDyq8L1pKVf3Eo92MnBR_gP5-ez4WkXUQvn1-wdwOxMJrWaO8zj1DnJi_dgb8XLePJTSiWYAI=s0-d-e1-ft#https://www.adglobal360.com/gmail_signature/agl_logo_new1.gif" width="150" height="90" className="d-inline-block align-top" alt="image path not found" />
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/userList">User List</NavLink>
                            </li>
                        </ul>
                        {!localStorage.getItem('user') ?

                            <form className='d-flex'>
                                <Link className='btn btn-dark mx-2' to="/signup" role="button">Signup</Link>
                                <Link className='btn btn-dark mx-2' to="/login" role="button">Login</Link>
                            </form>
                            :
                            <>
                                <button onClick={handleLogout} className='btn btn-dark'>Logout</button>
                                <h4 style={{ padding: "40px" }}>{JSON.parse(localStorage.getItem('user')).data.first_name}</h4>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}



export default Navbar;
