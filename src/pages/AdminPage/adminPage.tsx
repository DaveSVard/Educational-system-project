import React from "react";
import "./adminPage.scss"
import { useLocation } from "react-router-dom";

export const AdminPage:React.FC = ():JSX.Element => {

    const {pathname} = useLocation()

    return(
        <div className="adminPage">
            <div className="container">
                <div className="adminPage__wrapper">
                    <div className="adminPage__title">
                        {pathname == "/adminPage" ? <h1 className="title">Welcome! Admin</h1> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}