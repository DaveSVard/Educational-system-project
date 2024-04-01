import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectGroup } from "../../../features/group/groupSlice"
import { changeGroupModuleAPI, changeGroupTeacherAPI, deleteGroupAPI, getAllGroupesAPI, updateGroupAPI } from "../../../features/group/groupAPI"
import { Formik } from "formik";
import * as Yup from "yup";
import "./../../../styles/seeSubjects.scss"
import { selectTeacher } from "../../../features/teacher/teacherSlice";
import { selectModule } from "../../../features/module/moduleSlice";
import { getAllTeachersAPI } from "../../../features/teacher/teacherAPI";
import { getAllModulesAPI } from "../../../features/module/moduleAPI";
import { updateNameSchema } from "../../../features/schemas";
import { Link } from "react-router-dom";

const changeTeacherSchema = Yup.object().shape({
    teacherId: Yup.number().required("Select new teacher!")
});

const changeGroupesModuleSchema = Yup.object().shape({
    activeModuleId: Yup.number().required("Select new module!")
});

export const Groupes:React.FC = ():JSX.Element => {
    
    const dispatch = useAppDispatch()
    const {groupes} = useAppSelector(selectGroup)
    const {teachers} = useAppSelector(selectTeacher)
    const {modules} = useAppSelector(selectModule)

    useEffect(() => {
        dispatch(getAllGroupesAPI())
        dispatch(getAllTeachersAPI())
        dispatch(getAllModulesAPI())
    }, [])

    console.log(groupes);
    

    const [openInputId, setOpenInputId] = useState<number|null>(null);

    const toggleInputs = (id: number) => {
        setOpenInputId(prevId => (prevId === id ? null : id))
    }

    const updateGroupName = (id:number, values:{name:string}) => {
        dispatch(updateGroupAPI({id: id, newName: values.name})).then(res => {
            dispatch(getAllGroupesAPI())
        })
    }

    return(
        <div className="subject">
            <div className="container">
                <div className="subject__wrapper">
                    <div className="subject__title">
                        <h1 className="title">See All Groupes</h1>
                    </div>

                    <div className="subject__items">
                        {groupes.map(elm => {
                            return(
                                <div key={elm.id} className="subject__items-item">
                                    <div className="subject__items-item__wrapper">
                                        <div className="subject__items-item__info">
                                            <p><span className="desc">Name:</span> {elm.name}</p>
                                            <Link to={"/seeSingleGroup/" + elm.id}>See more</Link>
                                        </div>
                                        <div className="subject__items-item__btns">
                                            <button onClick={() => toggleInputs(elm.id)}>
                                                <i className="fa-solid fa-pencil" ></i>
                                            </button>
                                            <button onClick={() => dispatch(deleteGroupAPI(elm.id)).then(res => {
                                                dispatch(getAllGroupesAPI())
                                            })}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {openInputId == elm.id ? 
                                    <div className="subject__form-wrapper">
                                        <Formik 
                                            initialValues={{name: ""}}
                                            validationSchema={updateNameSchema}
                                            onSubmit={(values, { setSubmitting }) => {
                                                updateGroupName(elm.id, values)
                                            }}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleSubmit,
                                            }) => (
                                                <form  onSubmit={handleSubmit} className="subject__item-upgrade--second">
                                                    <div className="">
                                                        <input placeholder="Update module name" name="name" value={values.name} onChange={handleChange}/>
                                                        {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                                    </div>
                                                    <button type="submit" className="success-btn">Save</button> 
                                                </form>
                                            )}
                                        </Formik>

                                        <Formik 
                                            initialValues={{teacherId: 0}}
                                            validationSchema={changeTeacherSchema}
                                            onSubmit={(values, { setSubmitting }) => {
                                                dispatch(changeGroupTeacherAPI({id: elm.id, newTeacher: values.teacherId}))
                                            }}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleSubmit,
                                            }) => (
                                                <form  onSubmit={handleSubmit} className="subject__item-upgrade--second">
                                                    <div className="">
                                                        <select name="teacherId" value={values.teacherId} onChange={handleChange}>
                                                            <option value="" hidden>Change teacher</option>
                                                            {teachers.map(elm => {
                                                                return(
                                                                    <option key={elm.userId} value={elm.userId}>{elm.user.name} {elm.user.surname}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {errors.teacherId && touched.teacherId ? <p className="error">{errors.teacherId}</p> : <></>}
                                                    </div>
                                                    <button type="submit" className="success-btn">Save</button> 
                                                </form>
                                            )}
                                        </Formik>

                                        <Formik 
                                            initialValues={{activeModuleId: 0}}
                                            validationSchema={changeGroupesModuleSchema}
                                            onSubmit={(values, { setSubmitting }) => {
                                                dispatch(changeGroupModuleAPI({id: elm.id, newModule: values.activeModuleId}))
                                            }}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleSubmit,
                                            }) => (
                                                <form  onSubmit={handleSubmit} className="subject__item-upgrade--second">
                                                    <div className="">
                                                        <select name="activeModuleId" value={values.activeModuleId} onChange={handleChange}>
                                                            <option value="" hidden>Change module</option>
                                                            {modules.map(elm => {
                                                                return(
                                                                    <option key={elm.id} value={elm.id}>{elm.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {errors.activeModuleId && touched.activeModuleId ? <p className="error">{errors.activeModuleId}</p> : <></>}
                                                    </div>
                                                    <button type="submit" className="success-btn">Save</button> 
                                                </form>
                                            )}
                                        </Formik>

                                    </div>
                                     : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}