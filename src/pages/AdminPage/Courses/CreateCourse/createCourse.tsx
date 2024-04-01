import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./../../../../styles/createForm.scss"
import { useAppDispatch } from "../../../../app/hooks";
import { createCourseAPI } from "../../../../features/course/courseAPI";
import { useNavigate } from "react-router-dom";



const createCourseSchema = Yup.object().shape({
    name: Yup.string().required("Enter course name!")
});

export const CreateCourse:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    return(
        <div className="createCourse">
            <div className="container">
                <div className="create__form-wrapper">
                    <h1 className="title">Create Course</h1>
                    <Formik initialValues={{name: ""}}
                        validationSchema={createCourseSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(createCourseAPI({name: values.name})).then(res => {
                                navigate("/adminPage/courses")
                            })
                            
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit} className="create__form">
                                <input placeholder="Enter course name" name="name" value={values.name} onChange={handleChange}/>
                                {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                <button type="submit" className="success-btn">Create new course!</button>
                            </form>
                        )} 
                    </Formik>
                </div>
            </div>
        </div>
    )
}