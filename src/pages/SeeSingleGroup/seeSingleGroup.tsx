import React, { useEffect, useState } from "react"
import "./../../styles/singlePages.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectGroup } from "../../features/group/groupSlice"
import { getSingleGroupAPI } from "../../features/group/groupAPI"
import { useParams } from "react-router-dom"
import { selectHomework } from "../../features/homework/homeworkSlice"
import { getStudentsByGroupIdAPI } from "../../features/student/studentAPI"
import { selectStudent } from "../../features/student/studentSlice"
import { getRateByModuleGroupIdAPI } from "../../features/grade/gradeAPI"
import { Modal } from "../../components/Modal/modal"
import { getSingleHomeworkAPI } from "../../features/homework/homeworkAPI"

export const SeeSingleGroup: React.FC = (): JSX.Element => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { group } = useAppSelector(selectGroup);
    const {studentsGroup} = useAppSelector(selectStudent)
    const {homeworks, homeworkGrades, homework} = useAppSelector(selectHomework)

    const [gradesTable, setGradesTable] = useState<boolean>(false)
    const [failMessage, setFailMessage] = useState<boolean>(false)
    const [seeModal, setSeeModal] = useState<boolean>(false)

    const taskNumbersArr:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    useEffect(() => {
        if (id) {
            dispatch(getSingleGroupAPI(+id)).then(res => {
                dispatch(getStudentsByGroupIdAPI(res.payload?.id))
            })
        }
    }, [id]);

    const seeHomeworks = (moduleId:number) => {
        dispatch(getRateByModuleGroupIdAPI(moduleId)).then(res => {
            if(res.payload.homeworks?.length) {
                setGradesTable(true)
                setFailMessage(false)
            } else {
                setFailMessage(true)
            }
        })
    }

    const seeSingleHomework = (homeworkId:number) => {
        dispatch(getSingleHomeworkAPI(homeworkId)).then(res => {
            if(res.payload) {
                setSeeModal(true)
            }
        })
    }

    return (
        <div className="single">
            <div className="container">
                <div className="single__wrapper">
                    <div className="single__title">
                        <h1 className="title">About {group.name} group</h1>
                    </div>
                    <div className="single__info">
                        <ul className="single__info-list">
                            <div className="single__info-list__item">
                                <span className="desc">Teacher:</span>
                                <li>
                                    {group.teacher?.user.name} {group.teacher?.user.surname}
                                </li>
                            </div>
                            <div className="single__info-list__item">
                                <p className="desc">Modules:</p>
                                <ul>
                                    {group?.moduleGroups?.map((elm, i) => (
                                        <div key={elm.id}>
                                            <li>
                                                {`${++i}) ${elm.module?.name}`} ---{" "}
                                                <b>{elm.module.course.name}</b>
                                            </li>
                                            <button
                                                onClick={() => {
                                                    seeHomeworks(elm.module.id)
                                                }}
                                                className="seeBtn"
                                            >
                                                See Homeworks
                                            </button>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </ul>
                    </div>
                    {gradesTable && homeworks ? <div className="single__info-grades__table">
                        {homeworks?.length > 0 ? <select onChange={(e) => seeSingleHomework(+e.target.value)}>
                            <option value="" hidden>See about homework</option>
                            {homeworks.map(homework => {
                                return(
                                    <option value={homework.id} key={homework.id}>{homework.title}</option>
                                )
                            })}
                        </select> : <></> }
                            <table className="studentPage__table">
                                <thead>
                                    <tr>
                                        <th>Students</th>
                                        {taskNumbersArr.map((elm, i) => {
                                            return(
                                                <th key={i} onClick={() => seeSingleHomework(elm)}><button>{elm}</button></th>
                                            )
                                        })} 
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsGroup.map((student, i) => {
                                        return(
                                            <tr key={i}>
                                                <td>{student.name} {student.surname}</td>
                                                {taskNumbersArr.map((taskNumber, i) => {
                                                    const homework:any = homeworks?.find(homework => homework.taskNumber == taskNumber);
                                                    const grade = homeworkGrades?.find(a => a.taskNumber == homework?.taskNumber)?.grades?.find(grade => grade.studentUserId == student.id)
                                                    return (
                                                        <td key={i}>
                                                            {homework ? homework?.taskNumber == taskNumber && grade?.rating == 0 || grade?.rating ? grade?.rating : "-" : null}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div> : <></>}
                        {failMessage ? <p className="error">No homeworks in this module!</p> : <></>}
                        {seeModal ? <Modal active ={seeModal} setActive={setSeeModal}>
                            <div className="singleItemInfo">
                                <p><span className="desc">Title:</span> {homework.title}</p>
                                <p><span className="desc">Description:</span> {homework.description}</p>
                            </div>
                        </Modal> : <></>}
                </div>
            </div>
        </div>
    )
}