import React, { useEffect } from "react"
import "./../../../../styles/singlePages.scss"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectUser } from "../../../../features/admin/adminSlice"
import { getSingleUserAPI } from "../../../../features/admin/adminAPI"
import { selectGroup } from "../../../../features/group/groupSlice"
import { getAllGroupesAPI } from "../../../../features/group/groupAPI"
import * as Yup from "yup";
import { Formik } from "formik"
import { changeStudentGroupAPI } from "../../../../features/student/studentAPI"


export const changeStudentGroupSchema = Yup.object().shape({
    groupId: Yup.number().required("Select new group!")
});



export const SeeSingleUser:React.FC = ():JSX.Element => {
    
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(selectUser)
    const {groupes} = useAppSelector(selectGroup)

    useEffect(() => {
       if(id)  dispatch(getSingleUserAPI(+id))
       dispatch(getAllGroupesAPI())
    }, [id])

    return(
        <div className="single">
            <div className="container">
                <div className="single__wrapper">
                    <div className="single__title">
                        <h1 className="title">About {user.name} {user.surname}</h1>
                    </div>
                    <div className="single__info">
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role == 1 ? <>Teacher</> : <>Student</>}</p>
                    </div>

                    {user.role == 2 ? <Formik initialValues={{groupId: 0}}
                        validationSchema={changeStudentGroupSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(changeStudentGroupAPI({groupId: values.groupId, userId: user.id}))
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit} className="single__changeForm">
                                <select name="groupId" value={values.groupId} onChange={handleChange}>
                                    <option value="" hidden>Change group</option>
                                    {groupes?.map(elm => {
                                        return(
                                            <option key={elm.id} value={elm.id}>{elm.name}</option>
                                        )
                                    })}
                                </select>
                                {errors.groupId && touched.groupId ? <p className="error">{errors.groupId}</p> : <></>}
                                <button type="submit"  className="success-btn">Save</button>
                            </form>
                        )}
                    </Formik> : <></>}
                </div>
            </div>
        </div>
    )
}