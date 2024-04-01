import React from "react"
import "./../../pages/Settings/settings.scss"
import { changeUserDataSchema } from "../../features/schemas"
import { Formik } from "formik"
import { useAppDispatch } from "../../app/hooks"
import { getUserProfileAPI, updateUserDataAPI } from "../../features/admin/adminAPI"

export const ChangeDataForm:React.FC = React.memo(():JSX.Element => {

    const dispatch = useAppDispatch()

    return(
        <div className="settings__changeData">
            <h2 className="info-title">Change your name and surname</h2>
            <Formik initialValues={{name: "", surname: ""}}
                validationSchema={changeUserDataSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateUserDataAPI({name: values.name, surname: values.surname})).then(res => {
                        dispatch(getUserProfileAPI())
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
                    <form onSubmit={handleSubmit} className="settings__changeData-form">
                        <input placeholder="Enter new name" name="name" value={values.name} onChange={handleChange}/>
                        {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                        <input placeholder="Enter new surname" name="surname" value={values.surname} onChange={handleChange}/>
                        {errors.surname && touched.surname ? <p className="error">{errors.surname}</p> : <></>}
                        <button type="submit" className="success-btn">Save changes</button>
                    </form>
                )}
            </Formik>
        </div>
    )
})
