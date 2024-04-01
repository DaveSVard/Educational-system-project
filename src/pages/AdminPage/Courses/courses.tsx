import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCourse } from "../../../features/course/courseSlice";
import { deleteCourseAPI, getAllCoursesAPI, getSingleCourseAPI, updateCourseAPI } from "../../../features/course/courseAPI";
import { updateNameSchema } from "../../../features/schemas";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import "./../../../styles/seeSubjects.scss"
import { Modal } from "../../../components/Modal/modal";


export const Courses:React.FC = ():JSX.Element => {

    const {courses, course} = useAppSelector(selectCourse)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCoursesAPI())
    }, [])
    

    const [openInputId, setOpenInputId] = useState<number|null>(null);

    const toggleInputs = (id: number) => {
        setOpenInputId(prevId => (prevId === id ? null : id))
    }

    const update = (id:number, values:{name:string}) => {
        dispatch(updateCourseAPI({id: id, newName: values.name})).then(res => {
            dispatch(getAllCoursesAPI());
        })
    }

    const [seeModal, setSeeModal] = useState<boolean>(false)

    const seeAboutCourse = (courseId:number) => {
        dispatch(getSingleCourseAPI(courseId)).then(res => {
            if(res.payload.modules?.length) {
                setSeeModal(true)
            }
        })
    }

    return(
        <div className="subject">
            <div className="container">
                <div className="subject__wrapper">
                    <div className="subject__title">
                        <h1 className="title">See All Courses</h1>
                    </div>

                    <div className="subject__items">
                        {courses.map(elm => {
                            return(
                                <div className="subject__items-item" key={elm.id}>
                                    <div className="subject__items-item__wrapper">
                                        <div className="subject__items-item__info">
                                            <p><span className="desc">Name:</span> {elm.name}</p>
                                            <button onClick={() => seeAboutCourse(elm.id)}>See more...<i className="fa-regular fa-eye fz-15"></i></button>
                                        </div>
                                        <div className="subject__items-item__btns">
                                            <button onClick={() => toggleInputs(elm.id)}>
                                                <i className="fa-solid fa-pencil" ></i>
                                            </button>
                                            <button onClick={() => dispatch(deleteCourseAPI(elm.id)).then(res => {
                                                dispatch(getAllCoursesAPI());
                                            })}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                            
                                    </div>
                                    {openInputId == elm.id ? 
                                    <Formik 
                                        initialValues={{name: ""}}
                                        validationSchema={updateNameSchema}
                                        onSubmit={(values, { setSubmitting }) => {
                                            update(elm.id, values)
                                        }}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleSubmit,
                                        }) => (
                                            <form  onSubmit={handleSubmit} className="subject__item-upgrade">
                                                <div className="">
                                                    <input placeholder="Update course name" name="name" value={values.name} onChange={handleChange}/>
                                                    {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                                </div>
                                                <button type="submit" className="success-btn">Save</button> 
                                            </form>
                                        )}
                                    </Formik> : null}
                                </div>
                            )
                        })}
                    </div>

                    {seeModal ? <Modal active={seeModal} setActive={setSeeModal}>
                        <ul className="singleItemInfo">
                            <span className="desc">Modules:</span>
                            {course.modules?.map((elm, i) => {
                                return(
                                    <li key={elm.id}>{`${++i}) ${elm.name}`}</li>
                                )
                            })}
                        </ul>
                    </Modal> : <></>}
                </div>
            </div>
        </div>
    )
}
