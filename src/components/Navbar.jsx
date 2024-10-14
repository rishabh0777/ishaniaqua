/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
import { fetchUserData } from '../redux/slice/userSlice';
import Logo from '../assets/logo/logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState('customer');
  const myRole = useSelector((state) => state.user.role);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  useEffect(() => {
    const getRole = async () => {
      if (user) {
        dispatch(fetchUserData(user.uid));
        setRole(myRole);
        console.log(myRole);
      } else {
        setRole('customer');
      }
    };
    getRole();
  }, [user, role, dispatch, myRole]);

  const logOut = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(logout(user));
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  };

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <nav
        className={`fixed top-0 right-0 h-full w-[70%] bg-white/30 backdrop-blur-lg border border-white/20 rounded-l-lg shadow-lg p-6 z-50 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        {/* Close Icon (X) */}
        <div className="flex justify-start mb-4">
          <i
            className="ri-close-line text-3xl cursor-pointer text-blue-500 active:text-blue-400"
            onClick={toggleMenu}
          ></i>
        </div>

        <ul className="flex flex-col gap-4 h-[60%] space-y-6 justify-center">
          <li>
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              Home
            </NavLink>
          </li>
          <li>
            {role === 'admin' ? (
              <NavLink
                to="/admin"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
              >
                Admin Panel
              </NavLink>
            ) : (
              <NavLink
                to="/order"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
              >
                My Order
              </NavLink>
            )}
          </li>
          {role === 'admin' && (
            <li>
              <NavLink
                to="/my-customer"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
              >
                My Customer's
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/offers"
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/t&c"
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              Term's & Conditions
            </NavLink>
          </li>
          <li>
            {user ? (
              <Button
                func={logOut}
                className="bg-red-500 hover:bg-red-400 text-[0.9em] py-2 px-5"
                text="Logout"
              />
            ) : (
              <Button
                func={() => navigate('/signup', { replace: true })}
                className="bg-[#2665ed] text-[0.9em] py-2 px-5"
                text="Signup"
              />
            )}
          </li>
        </ul>
      </nav>

      {/* Main Navbar */}
      <nav className={`w-full h-[12vh] flex justify-between items-center px-5 py-3 shadow-md shadow-black`}>
        {/*<h2 className="text-[#2665ed] text-2xl">Ishani</h2>*/}
      <div className="md:w-[5vw] ml-7 xsm:w-[15vw]">
        <img src={Logo} alt="Ishani" />
      </div>
        <ul className="w-1/2 md:flex hidden gap-10 justify-center items-center text-[0.9em]">
          <li className="flex flex-col group">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              Home
            </NavLink>
            <span className="w-[0%] group-hover:w-full mt-[0.1em] border-[0.1em] group-hover:border-[#2665ed] transition-all duration-300 ease-in-out"></span>
          </li>
          <li className="flex flex-col group">
            {role === 'admin' ? (
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
              >
                Admin Panel
              </NavLink>
            ) : (
              <NavLink
                to="/order"
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
              >
                My Order
              </NavLink>
            )}
            <span className="w-[0%] group-hover:w-full mt-[0.1em] border-[0.1em] group-hover:border-[#2665ed] transition-all duration-300 ease-in-out"></span>
          </li>
          {role === 'admin' && (
            <li className="flex flex-col group">
              <NavLink
                to="/my-customer"
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
              >
                My Customer's
              </NavLink>
              <span className="w-[0%] group-hover:w-full mt-[0.1em] border-[0.1em] group-hover:border-[#2665ed] transition-all duration-300 ease-in-out"></span>
            </li>
          )}
          <li className="flex flex-col group">
            <NavLink
              to="/offers"
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              Offers
            </NavLink>
            <span className="w-[0%] group-hover:w-full mt-[0.1em] border-[0.1em] group-hover:border-[#2665ed] transition-all duration-300 ease-in-out"></span>
          </li>
          <li className="flex flex-col group">
            <NavLink
              to="/t&c"
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              Term's & Conditions
            </NavLink>
            <span className="w-[0%] group-hover:w-full mt-[0.1em] border-[0.1em] group-hover:border-[#2665ed] transition-all duration-300 ease-in-out"></span>
          </li>
        </ul>
        <div className="w-[10%] md:flex hidden items-center gap-4">
          {user ? (
            <Button
              func={logOut}
              className="text-[0.9em] py-2 px-5 bg-red-500 hover:bg-red-400"
              text="Logout"
            />
          ) : (
            <Button
              func={() => navigate('/signup', { replace: true })}
              className="text-[0.9em] bg-[#2665ed] py-2 px-5"
              text="Signup"
            />
          )}
        </div>
        <h2 className="md:hidden" onClick={toggleMenu}>
          <i className="ri-menu-4-fill text-blue-500 text-2xl active:text-blue-400"></i>
        </h2>
      </nav>
    </>
  );
};

export default Navbar;
