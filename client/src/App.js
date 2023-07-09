import Tasks from "./components/Tasks";
import LoginRegister from "./components/LoginRegister";
import {Routes, Route, Link} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import {createContext, useState} from "react";
import FixedBottomNavigation from "./components/Bottom";export const AppContext = createContext(null);

function App() {
    const [token, setToken] = useState(null)
    return(
        <AppContext.Provider value={{token, setToken}}>

            <div>
                <Routes>
                    <Route path={'/tasks'} element={<Tasks/>} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                </Routes>
            </div>
            <FixedBottomNavigation />
        </AppContext.Provider>
    )
}

export default App;
