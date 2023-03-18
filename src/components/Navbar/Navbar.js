import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthProvider';

const Navbar = () => {

    const { user, logout } = useContext(UserAuth)
    


    const menuItem = <>
    <li className='font-semibold '><Link to="/">Home</Link></li>
    <li className='font-semibold '><Link to="/">Blog</Link></li>
    <li className='font-semibold '><Link to="/register">Register</Link></li>
  {
    user?.uid &&   <li className='font-semibold '><Link to="/dashboard">Dashboard</Link></li>
  }
</>

const handleLogout = () => {
    logout()
}

    return (
        <div className="navbar bg-rose-500 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost  lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact text-gray-600 dropdown-content mt-3 p-2 shadow bg-base-100">
                        {menuItem}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">DocRoute</Link>

            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">
                <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost  lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                {
                    user?.uid ? <>
                        <div className="avatar ml-2">
                            <div className="w-12  rounded-full">
                                <img src={user.photoURL} alt="userImage" title={user.displayName} />
                            </div>
                        </div>
                        <button onClick={handleLogout} className="btn bg-white text-rose-500 ml-2 border-0">Logout</button>
                    </>
                        :
                        <Link to="/login"><button className="btn ml-2  bg-white text-rose-500 border-0">Login</button></Link>
                }

            </div>
        </div>
    );
};

export default Navbar;