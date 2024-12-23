import React from 'react'
// import SVGLogoComponent from '../Icons/Logo'
import logo from "../Icons/vidyamargamlogo.png"
function Header() {

  return (
    <header>
      <div className="vidyamargam-logo">
        <img src={logo} alt="logo" width={40}/>&nbsp;Vidyamargam
      </div>
      <div className="header-menus">
        <div className="header-pagename">{window.location.pathname.replace("/","")}</div>
        <div className="">
          <img className="avatar" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="avatar"  />
        </div>
      </div>
    </header>
  )
}

export default Header