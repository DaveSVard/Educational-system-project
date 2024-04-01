import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { ChangeDataForm } from "../../components/ChangeDataForm/changeDataForm"
import { ChangePasswordForm } from "../../components/ChangePasswordForm/changePasswordForm"
import { ChangeUrlForm } from "../../components/ChangeUrlForm/changeUrlForm"
import { selectUser } from "../../features/admin/adminSlice"
import { getUserProfileAPI } from "../../features/admin/adminAPI"
import "./settings.scss"

export const Settings:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const { user } = useAppSelector(selectUser);
    useEffect(() => {
        dispatch(getUserProfileAPI())
    }, [])

    return(
        <div className="settings">
            <div className="container">
                <div className="settings__wrapper">
                    <div className="settings__title">
                        <h1 className="title">Settings</h1>
                    </div>

                    <div className="settings__content">
                        <div className="userInfo">
                            <img src={`http://localhost:3001/uploads/${user.pic_url}`} alt="userImg" />
                            <p><span className="desc">Name:</span> {user.name}</p>
                            <p><span className="desc">Surname:</span> {user.surname}</p>
                            <p><span className="desc">Email:</span> {user.email}</p>
                            {/* <p><span className="desc">Phone:</span> {user.phone_number}</p> */}
                            <p><span className="desc">Role:</span> {user.role == 0 ? "Admin" : user.role == 1 ? "Teacher" : user.role == 2 ? "Student" : null}</p>
                        </div>
                        <div className="settings__forms">
                            <ChangeDataForm/>

                            <ChangePasswordForm/>

                            <ChangeUrlForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}