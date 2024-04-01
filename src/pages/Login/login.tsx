import React, { useState } from "react";
import "./login.scss";

import { Formik } from "formik";
import * as Yup from "yup";
import { getUserProfileAPI, logInAPI } from "../../features/admin/adminAPI";
import { useAppDispatch } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../features/admin/adminSlice";

const logInSchema = Yup.object().shape({
  username: Yup.string().required("Enter your email!"),
  password: Yup.string().required("Enter your password!"),
});

export const Login: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const logIn = async (values: { username: string; password: string }) => {
    try {
      const response = await dispatch(logInAPI(values));
      const accessToken = response.payload?.access_token;
      dispatch(setToken(accessToken));
      const userProfile = await dispatch(getUserProfileAPI()).unwrap();
      console.log(userProfile);
      if (userProfile.role == 0) {
        navigate("/adminPage");
      } else if (userProfile.role == 1) {
        navigate("/teacherPage");
      } else if (userProfile.role == 2) {
        navigate("/studentPage");
      }
    } catch (error) {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="logIn">
      <div className="container">
        <div className="logIn__wrapper">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={logInSchema}
            onSubmit={(values, { setSubmitting }) => {
              logIn(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form className="logIn__form" onSubmit={handleSubmit}>
                <input
                  placeholder="Enter your email"
                  onChange={handleChange}
                  name="username"
                  value={values.username}
                />
                {errors.username && touched.username ? (
                  <p className="error">{errors.username}</p>
                ) : (
                  <></>
                )}
                <input
                  placeholder="Enter your password"
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : (
                  <></>
                )}
                {error && <p className="error">{error}</p>}
                <button type="submit" className="success-btn">
                  LogIn
                </button>
              </form>
            )}
          </Formik>
          <Link to={"/forgetPassword"} className="fz-15">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};
