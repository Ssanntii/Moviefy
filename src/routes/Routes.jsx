import { Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import Catalog from "../pages/Catalog"
import Detail from "../pages/detail/Detail"

import * as Config from "../constants/Config"

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
                element={<Catalog />}
            />
            <Route 
                path={`/${Config.HOME_PAGE}/:category/:id`} 
                element={<Detail />} 
            />
            <Route 
                path={`/${Config.HOME_PAGE}/:category`} 
                element={<Catalog />} 
            />
            <Route 
                path={`/${Config.HOME_PAGE}`} 
                element={<Home />} 
            />
            <Route 
                path="/" 
                element={<Home />} 
            />
        </Routes>
    )
}

export default AppRoutes