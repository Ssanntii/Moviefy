import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";

const headerNav = [
  {
    display: "Home",
    path: `/${Config.HOME_PAGE}`,
  },
  {
    display: "Movies",
    path: `/${Config.HOME_PAGE}/movie`,
  },
  {
    display: "TV Series",
    path: `/${Config.HOME_PAGE}/tv`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div 
      ref={headerRef} 
      className="h-20 fixed top-0 left-0 w-full z-[99] transition-all duration-300 ease-in-out [&.shrink]:h-16 [&.shrink]:bg-gray-900"
    >
      <div className="flex items-center justify-between h-full px-8 container md:justify-center">
        {/* Logo */}
        <div className="text-4xl font-semibold flex items-center">
          <img 
            src={logo} 
            alt="logo" 
            className="mr-2.5 w-12 md:w-8 md:mr-0"
          />
          <Link 
            to={`/${Config.HOME_PAGE}`}
            className="text-white hover:opacity-80 transition-opacity"
          >
            hMovies
          </Link>
        </div>

        {/* Navigation */}
        <ul className="flex items-center space-x-8 md:fixed md:bottom-0 md:left-0 md:h-20 md:w-full md:bg-gray-900 md:px-8 md:shadow-lg md:flex md:items-center md:justify-between md:space-x-0">
          {headerNav.map((e, i) => (
            <li 
              key={i} 
              className={`py-1.5 font-bold relative text-2xl group ${
                i === active ? 'active' : ''
              }`}
            >
              <Link 
                to={e.path}
                className="text-white hover:opacity-80 transition-opacity"
              >
                {e.display}
              </Link>
              {/* Underline effect */}
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500 transition-all duration-500 ease-in-out ${
                i === active ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;