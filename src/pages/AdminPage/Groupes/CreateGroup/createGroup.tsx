import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectTeacher } from "../../../../features/teacher/teacherSlice"
import { Formik } from "formik";
import * as Yup from "yup";
import "./../../../../styles/createForm.scss"
import { useEffect } from "react";
import { getAllTeachersAPI } from "../../../../features/teacher/teacherAPI";
import { selectModule } from "../../../../features/module/moduleSlice";
import { getAllModulesAPI } from "../../../../features/module/moduleAPI";
import { createGroupAPI } from "../../../../features/group/groupAPI";

const createGroupSchema = Yup.object().shape({
    name: Yup.string().required("Enter group name!"),
    teacherId: Yup.number().required("Select teacher!"),
    activeModuleId: Yup.number().required("Select module!"),
});


export const CreateGroupe:React.FC = ():JSX.Element => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {teachers} = useAppSelector(selectTeacher)
    const {modules} = useAppSelector(selectModule)


    useEffect(() => {
        dispatch(getAllTeachersAPI())
        dispatch(getAllModulesAPI())
    }, [])

    return(
        <div className="createGroup">
            <div className="container">
                <div className="create__form-wrapper">
                    <h1 className="title">Create Group</h1>

                    <Formik initialValues={{name: "", teacherId: 0, activeModuleId: 0}}
                        validationSchema={createGroupSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(createGroupAPI({name: values.name, teacherId: values.teacherId, activeModuleId: values.activeModuleId})).then(res => {
                                navigate("/adminPage/groupes")
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
                                <select name="teacherId" value={values.teacherId} onChange={handleChange}>
                                    <option value="" hidden>Select teacher</option>
                                    {teachers.map(elm => {
                                        return(
                                            <option key={elm.userId} value={elm.userId}>{elm.user.name} {elm.user.surname}</option>
                                        )
                                    })}
                                </select>
                                {errors.teacherId && touched.teacherId ? <p className="error">{errors.teacherId}</p> : <></>}
                                <select name="activeModuleId" value={values.activeModuleId} onChange={handleChange}>
                                    <option value="" hidden>Select module</option>
                                    {modules.map(elm => {
                                        return(
                                            <option key={elm.id} value={elm.id}>{elm.name}</option>
                                        )
                                    })}
                                </select>
                                {errors.activeModuleId && touched.activeModuleId ? <p className="error">{errors.activeModuleId}</p> : <></>}
                                <button type="submit" className="success-btn">Create Group</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}