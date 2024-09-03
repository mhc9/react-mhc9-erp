import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const NavDropdownMenu = ({ isShow, hide, submenus, userRole }) => {
    return (
        <ul className={`dropdown-menu ${isShow ? 'active' : ''}`}>
            {submenus.map((menu, index) => (
                <Fragment key={index}>
                    {/* Divided menu */}
                    {menu.type === 'divided' && <li><hr className="dropdown-divider m-0" /></li>}

                    {/* Allow All */}
                    {menu.type !== 'divided' && typeof userRole !== undefined && menu.allowed_users.length === 0  && (
                        <li className="hover:bg-gray-300 p-2">
                            <Link to={menu.link}>
                                <p className="w-full" onClick={hide}>{menu.text}</p>
                            </Link>
                        </li>
                    )}

                    {/* Allow user's role in menu's allowed_users */}
                    {menu.type !== 'divided' && typeof userRole !== undefined && (menu.allowed_users.length > 0 && menu.allowed_users.includes(userRole)) && (
                        <li className="hover:bg-gray-300 p-2">
                            <Link to={menu.link}>
                                <p className="w-full" onClick={hide}>{menu.text}</p>
                            </Link>
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    )
}

export default NavDropdownMenu