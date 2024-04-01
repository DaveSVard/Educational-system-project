import React, { useEffect } from "react"
import { Formik } from "formik";
import * as Yup from "yup";
import "./../../../../styles/createForm.scss"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectCourse } from "../../../../features/course/courseSlice";
import { getAllCoursesAPI } from "../../../../features/course/courseAPI";
import { createModuleAPI } from "../../../../features/module/moduleAPI";
import { useNavigate } from "react-router-dom";


const createModuleSchema = Yup.object().shape({
    name: Yup.string().required("Enter course name!"),
    courseId: Yup.number().required("Select course!")
});

export const CreateModule:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {courses} = useAppSelector(selectCourse)

    useEffect(() => {
        dispatch(getAllCoursesAPI())
    }, [])

    return(
        <div className="createModule">
            <div className="container">
                <div className="create__form-wrapper">
                    <h1 className="title">Create Module</h1>

                    <Formik initialValues={{name: "", courseId: 0}}
                        validationSchema={createModuleSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(createModuleAPI({name: values.name, courseId: values.courseId})).then(res => {
                                navigate("/adminPage/modules")
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
                            <form  onSubmit={handleSubmit} className="create__form">
                                <input placeholder="Enter course name" name="name" value={values.name} onChange={handleChange} />
                                {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                <select name="courseId" value={values.courseId} onChange={handleChange}>
                                    <option value="" hidden>Select course</option>
                                    {courses.map(elm => {
                                        return(
                                            <option key={elm.id} value={elm.id}>{elm.name}</option>
                                        )
                                    })}
                                </select>
                                {errors.courseId && touched.courseId ? <p className="error">{errors.courseId}</p> : <></>}
                                <button type="submit" className="success-btn">Create Module</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}