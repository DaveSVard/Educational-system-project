import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCourse } from "../../features/course/courseSlice";
import { getAllCoursesAPI, getSingleCourseAPI } from "../../features/course/courseAPI";
import { Link } from "react-router-dom";
import "./../../styles/seeSubjects.scss"
import { Modal } from "../../components/Modal/modal";

export const SeeCourses:React.FC = ():JSX.Element => {

    const {courses, course} = useAppSelector(selectCourse)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCoursesAPI())
    }, [])

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
                                    </div>
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
