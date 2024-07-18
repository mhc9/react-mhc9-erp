import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const NavDropdownMenu = ({ isShow, hide, submenus, userRole }) => {
    return (
        <ul className={`dropdown-menu ${isShow ? 'active' : ''}`}>
            {submenus.map((menu, index) => (
                <Fragment key={index}>
                    {menu.type === 'divided' && <li><hr className="dropdown-divider m-0" /></li>}

                    <li className="hover:bg-gray-300 p-2">
                        <Link to={menu.link}>
                            <p className="w-full" onClick={hide}>{menu.text}</p>
                        </Link>
                    </li>
                </Fragment>
            ))}
        </ul>
    )
}

export default NavDropdownMenu