import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/inotebook-logo.png';
import { CiSearch } from "react-icons/ci";  // Search icon
import { FaRegUser } from "react-icons/fa";  // User icon
import { Link, useNavigate, } from 'react-router-dom';
import { NoteContext } from '../Context/NoteProvider';



const Navbar = () => {
    const { UserData, FetchNotes, note, LoginUser } = useContext(NoteContext); // ✅ Use NoteContext here
    let navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);   // set state for hamburger
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);  // set state for Usermenu

    // Initial Fetch on Refresh (only once)
    useEffect(() => {
        if (localStorage.getItem("token")) {
            UserData(); // call the userData function that fetch the user name or detail
            FetchNotes();  // call function that fetch authenticated user notes
        }
    }, [LoginUser]);


    //function for toggle mobile menu on onlick on hamburger
    const ToggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const ToggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }
    //handle the Logout function
    const handleLogout = (e) => {
        if (localStorage.getItem("token")) {
            e.preventDefault();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    }

    return (
        <>
            <nav className="bg-gray-700">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center relative px-2 sm:px-0">

                        {/* Logo and Menu */}
                        <div className="logo flex sm:space-x-7 w-fit order-2 sm:order-1">
                            <Link to="/"><img className='h-14 my-1' src={logo} alt="inotebook" /></Link>

                            {/* Menu Items */}
                            <ul className={`flex flex-col sm:flex-row sm:items-center px-2 sm:px-0 sm:space-x-6 absolute left-0 w-full top-16 sm:top-0 sm:relative bg-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'h-auto py-2' : 'h-0 py-0'} sm:h-auto sm:py-0`}>
                                <li className='text-white py-5 ps-3 relative list-animation sm:ps-0 hover:bg-[#009de0] sm:hover:bg-transparent cursor-pointer'><Link to="/">Home</Link></li>
                                <li className='text-white py-5 ps-3 relative list-animation sm:ps-0 hover:bg-[#009de0] sm:hover:bg-transparent cursor-pointer'>About</li>
                                <li className='text-white py-5 ps-3 relative list-animation sm:ps-0 hover:bg-[#009de0] sm:hover:bg-transparent cursor-pointer'>Contact Us</li>
                            </ul>
                        </div>

                        {/* Hamburger */}
                        <div className="hamburger flex flex-col space-y-0.5 p-3 order-1 sm:hidden cursor-pointer" onClick={ToggleMobileMenu}>
                            <span className="line bg-white w-5 h-0.5"></span>
                            <span className="line bg-white w-5 h-0.5"></span>
                            <span className="line bg-white w-5 h-0.5"></span>
                        </div>

                        {/* Search and Account */}
                        <div className="flex items-center relative space-x-3 order-3 sm:order-2 me-2 sm:me-0">
                            <CiSearch className='text-white size-6' />
                            <span className="rounded-full bg-white p-2 m-0" onClick={ToggleUserMenu}>
                                <FaRegUser className='text-gray-700' />
                            </span>

                            <ul className={`absolute right-0 top-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none ${isUserMenuOpen ? '' : 'hidden'}`} >
                                <li><Link id="user-menu-item-0" role="menuitem" tabIndex="-1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#009de0] hover:text-white" >{localStorage.getItem("token") ? localStorage.getItem("user") : 'Your Profile'}</Link></li>
                                <li><Link id="user-menu-item-1" role="menuitem" tabIndex="-1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#009de0] hover:text-white" >Settings</Link></li>
                                <hr className='text-gray-200' />
                                <li>{localStorage.getItem("token") ? (<Link id="user-menu-item-2" role="menuitem" tabIndex="-1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#009de0] hover:text-white" onClick={handleLogout} >Sign out</Link>) :
                                    (<Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#009de0] hover:text-white">Login</Link>)}</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
