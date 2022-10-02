import React from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Nav.css'
// import history from './history'
import { useHistory } from "react-router-dom";
// import { history } from 'react-router';

const Header = (props) => {
  const history = useHistory();
  const { viewCartP } = props;
  // const {roles} = props;
  const role = localStorage.getItem("userRole");
  const carNav = '/cart/'+localStorage.getItem("userId");
  console.log(props);
  const logout = () =>{
    Cookies.remove('jwt_token');
    localStorage.removeItem("userRole");
    history.push('/')
  }
  const viewCart = (event)=>{
    event.preventDefault();
    viewCartP();
  }
  return (
  <nav className="nav-header">
    <div className="nav-content">
      <img
        className="website-logo"
        src="https://tse2.mm.bing.net/th?id=OIP.yQFgAcyXvUN93X7ZcKm19wHaDh&pid=Api&P=0"
        alt="website logo"
      />
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {role === 'admin' &&  <li>
          <Link to="/add/institute" className="nav-link">
            View Students
          </Link>
        </li>}
        <li>
          <Link to="/institute" className="nav-link">
            View Institute
          </Link>
        </li>
      {role === 'admin' &&  <li>
          <Link to="/add/institute" className="nav-link">
            Add Institute
          </Link>
        </li>}
        {role !== 'admin' &&  <span onClick={viewCart}>
          <Link  className="nav-link">
            Cart
          </Link>
        </span>}
    
      </ul>
      {/* {shouldShow && <button type="button" className="logout-desktop-btn" onClick={clickCustom} >
        {text}
      </button>} */}
      <button type="button" className="logout-desktop-btn" onClick={logout} >
        Logout
      </button>
    </div>
  </nav>
)}
export default Header 
