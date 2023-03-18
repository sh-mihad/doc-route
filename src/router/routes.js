import Register from "../pages/Login&Register/Register";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main"
import Home from "../pages/Home/Home";
import Login from "../pages/Login&Register/Login";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: "/",
                element:<Home/>
            },
            {
                path: "/register",
                element:<Register/>
            },
            {
                path: "/login",
                element:<Login/>
            }
        ]
    },
    {
        
    }


])


export default router;