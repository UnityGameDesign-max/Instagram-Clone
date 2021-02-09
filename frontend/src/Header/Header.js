import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <img className="header_logo" alt="" src={process.env.PUBLIC_URL + "/1200px-Instagram_logo.svg.png"} />
         
        </div>
    )
}

export default Header
