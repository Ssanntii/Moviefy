import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import * as Config from "../constants/Config";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div 
      ref={headerRef} 
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 ease-in-out ${
        isScrolled ? 'h-16 bg-gray-900' : 'h-20'
      }`}
    >
      <div className="flex items-center justify-between h-full px-8 max-w-7xl mx-auto">
        {/* Logo - Siempre a la izquierda */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="logo" 
            className="mr-2.5 w-12 h-12"
          />
          <Link 
            to={`/${Config.HOME_PAGE}`}
            className="text-white text-3xl font-semibold hover:opacity-80 transition-opacity"
          >
            Moviefy
          </Link>
        </div>

        {/* Desktop Navigation - Siempre a la derecha */}
        <ul className="hidden md:flex items-center space-x-8">
          {headerNav.map((e, i) => (
            <li 
              key={i} 
              className="py-1.5 font-bold relative text-xl group"
            >
              <Link 
                to={e.path}
                className="text-white hover:opacity-80 transition-opacity"
              >
                {e.display}
              </Link>
              {/* Underline effect */}
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-teal-400 transition-all duration-500 ease-in-out ${
                i === active ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-gray-900 px-8 shadow-lg">
        <ul className="flex items-center justify-between h-full">
          {headerNav.map((e, i) => (
            <li 
              key={i} 
              className="py-1.5 font-bold relative text-lg group flex-1 text-center"
            >
              <Link 
                to={e.path}
                className="block text-white hover:opacity-80 transition-opacity"
              >
                {e.display}
              </Link>
              {/* Underline effect */}
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-teal-400 transition-all duration-500 ease-in-out ${
                i === active ? 'w-3/4' : 'w-0 group-hover:w-3/4'
              }`}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;