import React from "react";
import { Link } from "react-router-dom";

import bg from "./../../assets/footer-bg.jpg";
import logo from "./../../assets/logo.png";

import * as Config from "./../../constants/Config";

const Footer = () => {
  return (
    <div 
      className="relative py-24 px-8 bg-top bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-12">
          <div className="logo flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white text-xl font-bold hover:opacity-80 transition-opacity"
            >
              Moviefy
            </Link>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
          <div className="flex flex-col items-start mt-4 text-2xl font-semibold space-y-4">
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Home
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Contact us
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Term of service
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              About us
            </Link>
          </div>
          
          <div className="flex flex-col items-start mt-4 text-2xl font-semibold space-y-4">
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Live
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              FAQ
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Premium
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Privacy policy
            </Link>
          </div>
          
          <div className="flex flex-col items-start mt-4 text-2xl font-semibold space-y-4">
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              You must watch
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Recent release
            </Link>
            <Link 
              to={`/${Config.HOME_PAGE}`}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Top IMDB
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;