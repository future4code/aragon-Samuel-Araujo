import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "../pages/HomePage"
import ErrorPage from "../pages/ErrorPage"
import AdminPage from "../pages/AdminPage"


function RoutesLabeX() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/admin"} element={<AdminPage />}/>
                <Route path={"*"} element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesLabeX