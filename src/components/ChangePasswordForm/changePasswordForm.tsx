import React from "react"
import "./../../pages/Settings/settings.scss"
import { Formik } from "formik"
import { useAppDispatch } from "../../app/hooks"
import { changePasswordSchema } from "../../features/schemas"
import { changeUserPasswordAPI } from "../../features/admin/adminAPI"

export const ChangePasswordForm:React.FC = React.memo(():JSX.Element => {

    const dispatch = useAppDispatch()

    return(
        <div className="settings__changeData">
            <h2 className="info-title">Change your password</h2>
            <Formik initialValues={{currentPassword: "", password: "", confirmationPassword: ""}}
                validationSchema={changePasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(changeUserPasswordAPI({...values}))
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit} className="settings__changeData-form">
                        <input placeholder="Enter old password" name="currentPassword" value={values.currentPassword} onChange={handleChange}/>
                        {errors.currentPassword && touched.currentPassword ? <p className="error">{errors.currentPassword}</p> : <></>}
                        <input placeholder="Enter new password" name="password" value={values.password} onChange={handleChange}/>
                        {errors.password && touched.password ? <p className="error">{errors.password}</p> : <></>}
                        <input placeholder="Repeat new password" name="confirmationPassword" value={values.confirmationPassword} onChange={handleChange}/>
                        {errors.confirmationPassword && touched.confirmationPassword ? <p className="error">{errors.confirmationPassword}</p> : <></>}
                        <button type="submit" className="success-btn">Save changes</button>
                    </form>
                )}
            </Formik>
        </div>
    )
})