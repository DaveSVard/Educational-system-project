import React, { useState } from "react"
import { getUserProfileAPI, updateUserPictureAPI } from "../../features/admin/adminAPI"
import { useAppDispatch } from "../../app/hooks"
import "./../../pages/Settings/settings.scss"

export const ChangeUrlForm:React.FC = React.memo(():JSX.Element => {

    const dispatch = useAppDispatch()

    const [picture, setPicture] = useState<any>()
    const updatePicture = () => {
        let formData = new FormData()
        formData.append("file", picture[0])
        dispatch(updateUserPictureAPI(formData)).then(res => {
            if(res.payload) {
                dispatch(getUserProfileAPI())
            }
        })
    }

    return(
        <div className="settings__changeData">
            <h2 className="info-title">Update you picture</h2>
                <div className="settings__changeData-form">
                    <input type="file" onChange={(e:any)=> setPicture(e.target.files)}/>
                    <button className="success-btn" onClick={() => updatePicture()}>Save changes</button>
                </div>
        </div>
    )
})