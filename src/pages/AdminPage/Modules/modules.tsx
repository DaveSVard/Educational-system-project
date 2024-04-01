import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectModule } from "../../../features/module/moduleSlice"
import { changeModuleCourseAPI, deleteModuleAPI, getAllModulesAPI, getSingleModuleAPI, updateModuleAPI } from "../../../features/module/moduleAPI"
import { Formik } from "formik";
import * as Yup from "yup";
import { updateNameSchema } from "../../../features/schemas"
import { selectCourse } from "../../../features/course/courseSlice"
import { getAllCoursesAPI } from "../../../features/course/courseAPI"
import { Link } from "react-router-dom";
import "./../../../styles/seeSubjects.scss"
import { Modal } from "../../../components/Modal/modal";

const changeModulesCourseSchema = Yup.object().shape({
    courseId: Yup.number().required("Select new course!")
});

export const Modules:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const {modules, module} = useAppSelector(selectModule)
    const {courses} = useAppSelector(selectCourse)

    useEffect(() => {
        dispatch(getAllModulesAPI())
        dispatch(getAllCoursesAPI())
    }, [])

    const [openInputId, setOpenInputId] = useState<number|null>(null);

    const toggleInputs = (id: number) => {
        setOpenInputId(prevId => (prevId === id ? null : id))
    }

    const updateModuleName = (id:number, values:{name:string}) => {
        dispatch(updateModuleAPI({id: id, newName: values.name})).then(res => {
            dispatch(getAllModulesAPI())
        })
    }


    const [seeModal, setSeeModal] = useState<boolean>(false)

    const seeAboutModule = (moduleId:number) => {
        dispatch(getSingleModuleAPI(moduleId)).then(res => {
            if(res.payload.course) {
                setSeeModal(true)
            }
        })
    }

    return(
        <div className="subject">
            <div className="container">
                <div className="subject__wrapper">
                    <div className="subject__title">
                        <h1 className="title">See All Modules</h1>
                    </div>

                    <div className="subject__items">
                        {modules.map(elm => {
                            return(
                                <div key={elm.id} className="subject__items-item">
                                    <div className="subject__items-item__wrapper">
                                        <div className="subject__items-item__info">
                                            <p><span className="desc">Name:</span> {elm.name}</p>
                                            <button onClick={() => seeAboutModule(elm.id)}>See more...<i className="fa-regular fa-eye fz-15"></i></button>
                                        </div>
                                        <div className="subject__items-item__btns">
                                            <button onClick={() => toggleInputs(elm.id)}>
                                                <i className="fa-solid fa-pencil" ></i>
                                            </button>
                                            <button onClick={() => dispatch(deleteModuleAPI(elm.id)).then(res => {
                                                dispatch(getAllModulesAPI())
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
                                            onSubmit={(values) => {
                                                updateModuleName(elm.id, values)
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
                                            initialValues={{courseId: 0}}
                                            validationSchema={changeModulesCourseSchema}
                                            onSubmit={(values) => {
                                                dispatch(changeModuleCourseAPI({moduleId: elm.id, courseId: values.courseId}))
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
                                                        <select name="courseId" value={values.courseId} onChange={handleChange}>
                                                            <option value="" hidden>Change course</option>
                                                            {courses.map(elm => {
                                                                return(
                                                                    <option key={elm.id} value={elm.id}>{elm.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {errors.courseId && touched.courseId ? <p className="error">{errors.courseId}</p> : <></>}
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

                    {seeModal ? <Modal active={seeModal} setActive={setSeeModal}>
                        <div className="singleItemInfo">
                            <p><span className="desc">Course:</span> {module.course?.name}</p>
                        </div>
                    </Modal> : <></>}
                </div>
            </div>
        </div>
    )
}