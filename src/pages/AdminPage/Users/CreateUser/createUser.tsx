import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { createUserAPI } from "../../../../features/admin/adminAPI";
import { UserRole } from "../../../../features/type";
import React, { useEffect, useState } from "react";
import "./../../../../styles/createForm.scss"
import { useNavigate } from "react-router-dom";
import { selectGroup } from "../../../../features/group/groupSlice";
import { getAllGroupesAPI } from "../../../../features/group/groupAPI";

const createUserSchema = Yup.object().shape({
    name: Yup.string().required("Enter user name!"),
    surname: Yup.string().required("Enter user surname!"),
    email: Yup.string().required("Enter user email!"),
    password: Yup.string().required("Enter user password!"),
    phone_number: Yup.string().required("Enter user phone number!"),
});

export const CreateUser:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {groupes} = useAppSelector(selectGroup)

    const [roleError, setRoleError] = useState<boolean>(false)
    const [groupeError, setGroupError] = useState<boolean>(false)
    const [role, setRole] = useState<string>("")
    const [groupId, setGroupId] = useState<number>(0)

    useEffect(() => {
        dispatch(getAllGroupesAPI())
    }, [])

    console.log(role);
    
    return (
        <div className="createUser">
            <div className="container">
                <div className="create__form-wrapper">
                    <h1 className="title">Create User</h1>
                    <Formik 
                        initialValues={{name: "", surname: "", email: "", password: "", phone_number: ""}}
                        validationSchema={createUserSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            if(role == "1") {
                                dispatch(createUserAPI({...values, role: +role, groupId: groupId})).then(res => {
                                    navigate("/adminPage/users")
                                })
                            } else if (role == "2" && groupId != 0) {
                                dispatch(createUserAPI({...values, role: +role, groupId: groupId})).then(res => {
                                    navigate("/adminPage/users")
                                })
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit} className="create__form">
                                <select onChange={(e) => {setRole(e.target.value)}}>
                                    <option value="" hidden>Select user role</option>
                                    <option value={UserRole.STUDENT}>Student</option>
                                    <option value={UserRole.TEACHER}>Teacher</option>
                                </select>
                                {roleError ? <p className="error">Choose user role!</p> : <></>}
                                <input placeholder="Enter user name" name="name" value={values.name} onChange={handleChange}/>
                                {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                <input placeholder="Enter user surname" name="surname" value={values.surname} onChange={handleChange}/>
                                {errors.surname && touched.surname ? <p className="error">{errors.surname}</p> : <></>}
                                <input placeholder="Enter user email" name="email" value={values.email} onChange={handleChange}/>
                                {errors.email && touched.email ? <p className="error">{errors.email}</p> : <></>}
                                <input placeholder="Enter user password" name="password" value={values.password} onChange={handleChange}/>
                                {errors.email && touched.email ? <p className="error">{errors.email}</p> : <></>}
                                <input placeholder="Enter user phone number" name="phone_number" value={values.phone_number} onChange={handleChange}/>
                                {errors.phone_number && touched.phone_number ? <p className="error">{errors.phone_number}</p> : <></>}
                                {role == "2" ? <select onChange={(e) => setGroupId(+e.target.value)}>
                                    <option value="" hidden>Select group</option>
                                    {groupes.map(elm => {
                                        return(
                                            <option value={elm.id} key={elm.id}>{elm.name}</option>
                                        )
                                    })}
                                </select> : <></>}
                                {role == "2" ? groupeError ? <p className="error">Choose group!</p> : <></> : <></>}
                                <button type="submit" className="success-btn" onClick={() => {
                                    role.length == 0 ? setRoleError(true) : setRoleError(false)
                                    groupId == 0 ? setGroupError(true) : setGroupError(false)
                                }}>Create new user!</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}