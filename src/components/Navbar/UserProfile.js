import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading'

const UserProfile = ({ user, isLoading, logout }) => {
    const [showDropdown, setShowDropsown] = useState(false);

    return (
        <div className="user-profile max-lg:hidden flex relative" onMouseOver={() => setShowDropsown(true)} onMouseLeave={() => setShowDropsown(false)}>
            <button className="hover:text-gray-400">
                {isLoading && <Loading />}
                {(!isLoading && user) && (
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 border-2 rounded-full flex items-start justify-center overflow-hidden">
                            {user.employee?.avatar_url
                                ? <img src={`${process.env.REACT_APP_API_URL}/uploads/${user.employee?.avatar_url}`} alt="employee-pic" />
                                : <img src="/img/avatar-heroes.png" alt="employee-pic" className="avatar-img" />
                            }
                        </div>
                        <i className="fas fa-caret-down"></i>
                    </div>
                )}
            </button>
            <div className={`dropdown-menu ${showDropdown ? 'active' : ''}`}>
                <div className="py-3 border-b rounded-t-md flex flex-col justify-center items-center gap-1">
                    <div className="w-12 h-12 border-2 rounded-full flex items-start justify-center overflow-hidden">
                        {user?.employee?.avatar_url
                            ? <img src={`${process.env.REACT_APP_API_URL}/uploads/${user?.employee?.avatar_url}`} alt="employee-pic" />
                            : <img src="/img/avatar-heroes.png" alt="employee-pic" className="avatar-img" />
                        }
                    </div>
                    <h3 className="font-bold">{(!isLoading && user) && user.name}</h3>
                    <p className="text-sm">{user?.employee?.position?.name}</p>
                </div>
                <ul>
                    <li className="hover:bg-gray-300 p-2 text-left">
                        <Link to="/profile">
                            <p className="w-full">
                                <i className="far fa-user-circle mr-1 ml-1"></i>
                                Profile
                            </p>
                        </Link>
                    </li>
                    <li className="hover:bg-gray-300 p-2 text-left">
                        <a href={`${process.env.REACT_APP_API_URL}/manual-user`} target="_blank">
                            <p className="w-full">
                                <i className="far fa-question-circle mr-1 ml-1"></i>
                                แนะนำการใช้งาน
                            </p>
                        </a>
                    </li>
                    <li><hr className="dropdown-divider m-0" /></li>
                    <li className="hover:bg-gray-300 p-2 rounded-b-md">
                        <button type="button" className="w-full text-left" onClick={logout}>
                            <i className="fas fa-sign-out-alt mx-1"></i>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfile