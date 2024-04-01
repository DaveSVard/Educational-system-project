import React from "react";
import { Formik } from "formik";
import { sendEmailSchema } from "../../features/schemas";
import "./../../styles/forgotPasswords.scss"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { forgotPasswordAPI } from "../../features/admin/adminAPI";


export const ForgetPasswordForm:React.FC = React.memo(():JSX.Element => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return(
        <div className="forgot">
            <div className="container">
                <div className="forgot__wrapper">
                    <Formik initialValues={{email: ""}}
                        validationSchema={sendEmailSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(forgotPasswordAPI(values.email)).then(res => {
                                navigate(`/resetPassword/${values.email}`)
                            })
                        }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form className="forgot__form" onSubmit={handleSubmit}>
                            <input placeholder="Enter your email!" name="email" value={values.email} onChange={handleChange}/>
                            {errors.email && touched.email ? <p className="error">{errors.email}</p> : <></>}
                            <button type="submit" className="success-btn">Send!</button>
                        </form>
                    )}
                </Formik>
                </div>
            </div>
        </div>
    )
})