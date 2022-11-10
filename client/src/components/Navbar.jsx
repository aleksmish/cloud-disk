import React, { useState } from "react";
import "../styles/navbar.css";
import Logo from "../assets/img/disk.svg";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { getFiles, searchFiles } from "../http/fileApi";
import { showLoader } from "../store/appSlice";
import { AiOutlineUser as DefaultAvatar } from 'react-icons/ai'

function Navbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.user)
  const currentDir = useSelector(state => state.file.currentDir)
  const isAuth = useSelector((state) => state.user.isAuth);
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)

  function searchHandler(e){
    setSearchName(e.target.value)

    if(searchTimeout){
      clearTimeout(searchTimeout)
    }

    dispatch(showLoader())
    if(e.target.value !== ''){
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value))
      }, 500, e.target.value))
    }
    else{
      dispatch(getFiles(currentDir))
    }
  }

  console.log(currentUser)

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__logo">
          <img src={Logo} alt="logo" className="navbar__logo" />
          <div className="navbar__header"><Link to="/">Cloud Disk</Link></div>
        </div>
        {isAuth && <input value={searchName} onChange={e => searchHandler(e)} className="navbar__search" type="text" placeholder="Название файла..."/>}
        {isAuth ? (
          <>
            <div className="navbar__login" onClick={() => dispatch(logout())}>
              <Link to="/login">Выйти</Link>
            </div>
            {currentUser.avatar ? 
              <NavLink to='/profile'>
                <img className="navbar__avatar" src={process.env.REACT_APP_API_URL + currentUser.avatar} alt='avatar'/> 
              </NavLink>
            :
             <NavLink to='/profile'>
                <DefaultAvatar/>
             </NavLink>
            } 
          </>
        ) : (
          <>
            <div className="navbar__login">
              <Link to="/login">Войти</Link>
            </div>
            <div className="navbar__registration">
              <Link to="/registration">Регистрация</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
