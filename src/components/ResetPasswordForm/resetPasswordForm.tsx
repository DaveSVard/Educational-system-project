import React, { useState } from "react";
import "./../../styles/forgotPasswords.scss";
import { Formik } from "formik";
import { forgotPasswordSchema } from "../../features/schemas";
import { useAppDispatch } from "../../app/hooks";
import { resetPasswordAPI } from "../../features/admin/adminAPI";
import { Link, useParams } from "react-router-dom";

export const ResetPasswordForm: React.FC = React.memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<boolean>(false);

  return (
    <div className="forgot">
      <div className="container">
        <div className="forgot__wrapper">
          {successMessage ? (
            <div className="center">
                <h1 className="success">You successfully reset password!</h1>
                <Link className="success" to={"/"}>Back to logIn!</Link>
            </div> 
          ) : failMessage ? (
            <h1 className="fail-message">Something wrong...</h1>
          ) : null}
          <Formik
            initialValues={{ code: "", password: "", confirm_password: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={(values, { setSubmitting }) => {                   
                if (id) {
                    dispatch(
                    resetPasswordAPI({
                        email: id,
                        code: +values.code,
                        password: values.password,
                        confirm_password: values.confirm_password,
                    })).unwrap().then(res => {
                        setSuccessMessage(true)
                        setSubmitting(false);
                    }).catch(() => {
                        setFailMessage(true)
                    })
                }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form className="forgot__form" onSubmit={handleSubmit}>
                <input
                  pattern="/^\d+$/"
                  type="number"
                  placeholder="Enter code!"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                />
                {errors.code && touched.code ? (
                  <p className="error">{errors.code}</p>
                ) : (
                  <></>
                )}
                <input
                  placeholder="Enter your new password!"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : (
                  <></>
                )}
                <input
                  placeholder="Repeat password!"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="error">{errors.confirm_password}</p>
                ) : (
                  <></>
                )}
                <button type="submit" className="success-btn">
                  Send!
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
});
