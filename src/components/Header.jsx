import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"
import * as Config from "../constants/Config"
import { useLanguage } from "../context/LanguageContext"

const Header = () => {
  const { pathname } = useLocation()
  const headerRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const { language, setLanguage } = useLanguage()


  const langKey = language.startsWith("es") ? "es" : "en"

  const translations = {
    en: {
      home: "Home",
      movies: "Movies",
      tv: "TV Shows",
    },
    es: {
      home: "Inicio",
      movies: "Películas",
      tv: "Series",
    },
  }

  const headerNav = [
    {
      display: translations[langKey].home,
      path: `/${Config.HOME_PAGE}`,
    },
    {
      display: translations[langKey].movies,
      path: `/${Config.HOME_PAGE}/movie`,
    },
    {
      display: translations[langKey].tv,
      path: `/${Config.HOME_PAGE}/tv`,
    }
  ]

  const active = headerNav.findIndex((e) => e.path === pathname)

  useEffect(() => {
    const shrinkHeader = () => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 100)
    }
    window.addEventListener("scroll", shrinkHeader)
    return () => {
      window.removeEventListener("scroll", shrinkHeader)
    }
  }, [])

  return (
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 ease-in-out ${
        isScrolled ? "h-16 bg-gray-900" : "h-20"
      }`}
    >
      <div className="flex items-center justify-between h-full px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="mr-2.5 w-12 h-12" />
          <Link
            to={`/${Config.HOME_PAGE}`}
            className="text-white text-3xl font-semibold hover:opacity-80 transition-opacity"
          >
            Moviefy
          </Link>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          {headerNav.map((e, i) => (
            <li key={i} className="py-1.5 font-bold relative text-xl group">
              <Link 
                to={e.path}
                className="text-white hover:opacity-80 transition-opacity"
              >
                {e.display}
              </Link>
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-teal-400 transition-all duration-500 ease-in-out ${
                i === active ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </li>
          ))}

          <li className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="text-white font-semibold py-1 px-3 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors duration-200"
            >
              {langKey.toUpperCase()}
            </button>
            {showLangDropdown && (
              <ul className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 min-w-[60px]">
                <li>
                  <button
                    onClick={() => { setLanguage('en-US'); setShowLangDropdown(false) }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-t-lg transition-colors text-white font-semibold"
                  >
                    EN
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setLanguage('es-ES'); setShowLangDropdown(false) }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-b-lg transition-colors text-white font-semibold"
                  >
                    ES
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

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
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-teal-400 transition-all duration-500 ease-in-out ${
                i === active ? 'w-3/4' : 'w-0 group-hover:w-3/4'
              }`}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
