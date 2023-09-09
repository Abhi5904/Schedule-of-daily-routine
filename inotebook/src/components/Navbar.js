import React, {useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">iNotebook</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
                </li>
              </ul>
              {localStorage.getItem('token')?<button onClick={handleLogout} className='btn btn-primary'>Logout</button>
              :<form className="d-flex" role="search">
                <Link className="btn btn-primary" to="/login" role='button'>Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role='button'>SignUp</Link>
              </form>}
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
