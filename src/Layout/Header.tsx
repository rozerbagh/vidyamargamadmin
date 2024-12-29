import React, { useState, useRef, useEffect } from "react";
// import SVGLogoComponent from '../Icons/Logo'
import logo from "../Icons/vidyamargamlogo.png"
const Header:React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Added state for dropdown
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown menu

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Function to toggle dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
    };
  }, [dropdownRef]);
  return (
    <header>
      <div className="vidyamargam-logo">
        <img src={logo} alt="logo" width={40}/>&nbsp;Vidyamargam
      </div>
      <div className="header-menus">
        <div className="header-pagename">{window.location.pathname.replace("/","")}</div>
        <div className="profile-container" ref={dropdownRef}>
          <img
            className="avatar"
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt="avatar"
            onClick={toggleDropdown} // Added onClick event to toggle dropdown
          />
          {isDropdownOpen && ( // Conditional rendering of dropdown
            <div className="dropdown-menu">
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header