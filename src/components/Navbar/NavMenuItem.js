import React, { useState } from 'react'
import NavDropdownMenu from './NavDropdownMenu'

const NavMenuItem = ({ text, submenus, userRole }) => {
    const [showDropdown, setShowDropsown] = useState(false);

    return (
        <li className="menu-item flex relative h-full" onMouseOver={() => setShowDropsown(true)} onMouseLeave={() => setShowDropsown(false)}>
            <button className="hover:text-gray-400 flex items-center gap-1">
                {text}
                <i className="fas fa-caret-down"></i>
            </button>
            <NavDropdownMenu
                isShow={showDropdown}
                submenus={submenus}
                hide={() => setShowDropsown(false)}
                userRole={userRole}
            />
        </li>
    )
}

export default NavMenuItem