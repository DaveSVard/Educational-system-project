import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/navbar";

export const Layout:React.FC = ():JSX.Element => {

    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}