import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div>
      <div className="options">
        <div className="commands">
          <div className="link-wrapper">
            <Link to="/">
              <img src="/images/home.ico" alt="Home" />
            </Link>
          </div>
          
          <div className="link-wrapper">
            <a href="">
              <img src="/images/bell-icons-16610-Windows.ico" alt="Notifications" />
            </a>
          </div>
          
          <div className="link-wrapper">
            <a href="">
              <img src="/images/profile-icon-png-910-Windows.ico" alt="Profile" />
            </a>
          </div>
          
          <div className="link-wrapper">
            <a href="">
              <img src="/images/details-icon-1416-Windows.ico" alt="Details" />
            </a>
          </div>
        </div>
      </div>

      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default Layout