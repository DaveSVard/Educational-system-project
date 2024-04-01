import React, { useEffect, useState } from "react"
import "./studentPage.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useLocation } from "react-router-dom"
import { selectUser } from "../../features/admin/adminSlice"
import { getUserProfileAPI } from "../../features/admin/adminAPI"
import { getGroupByStudentIdAPI, getHomeworkStudentByModuleIdAPI, getStudentsByGroupIdAPI } from "../../features/student/studentAPI"
import { selectGroup } from "../../features/group/groupSlice"
import { selectHomework } from "../../features/homework/homeworkSlice"
import { selectStudent } from "../../features/student/studentSlice"
import { getSingleHomeworkAPI } from "../../features/homework/homeworkAPI"

export const StudentPage:React.FC = ():JSX.Element => {

    const taskNumbersArr:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const {user} = useAppSelector(selectUser)
    const {studentsGroup} = useAppSelector(selectStudent)
    const {sGroups} = useAppSelector(selectGroup)
    const {studentHomeworks, homework} = useAppSelector(selectHomework)

    const [studentInfoTable, setStudentInfoTable] = useState<boolean>(false)
    const [homeworkInfo, setHomeworkInfo] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getUserProfileAPI())
        dispatch(getGroupByStudentIdAPI()).then(res => {
            dispatch(getStudentsByGroupIdAPI(res.payload[0].id))
        })
    }, [])

    const getStudentInfoByModuleId = (moduleId:number) => {
        setStudentInfoTable(true)
        dispatch(getHomeworkStudentByModuleIdAPI(moduleId))
    }

    const getSingleHomeworkInfo = (homeworkId:number) => {
        setHomeworkInfo(true)
        dispatch(getSingleHomeworkAPI(homeworkId))
    }

    console.log("sGroups =>", sGroups);
    console.log("studentsGroup =>", studentsGroup);
    console.log("studentHomeworks =>", studentHomeworks);
    
    
    return(
        <div className="studentPage">
            <div className="container">
                <div className="studentPage__wrapper">
                    <div className="teacherPage__title">
                        {pathname == "/studentPage" ? <div>
                            <h1 className="title">Welcome! {user.name} {user.surname}</h1>
                        </div> : <></>}
                    </div>

                    {pathname == "/studentPage" ? <div className="studentPage__info">
                        <h2 className="info-title">Your group</h2>
                        <div className="studentPage__info-content">
                            {studentsGroup.map(student => {
                                return(
                                    <div key={student.id}>
                                        <p>{student.name} {student.surname}</p>
                                        <p><span className="desc">Rating:</span> {Math.ceil(student.grades)}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="studentPage__select">
                            <select onChange={(e) => getStudentInfoByModuleId(+e.target.value)}>
                                <option value="" hidden>Choose module</option>
                                {sGroups.map(group => {
                                    return(
                                        group.moduleGroups.map(modules => {
                                            return(
                                                <option key={modules.id} value={modules.module?.id} >{modules.module?.name}</option>
                                            )
                                        })
                                    )
                                })}
                            </select>
                            {studentHomeworks.length != 0 ? <select onChange={(e) => getSingleHomeworkInfo(+e.target.value)}>
                                <option value="" hidden>Choose homework</option>
                                {studentHomeworks.map(homework => {
                                    return(
                                        <option value={homework.id} key={homework.id}>{homework.title}</option>
                                    )
                                })}
                            </select> : <></>}
                        </div>
                    </div> : <></>}

                    {pathname == "/studentPage" && studentInfoTable ? <table className="studentPage__table">
                        <thead>
                            <tr>
                                <th>Students</th>
                                {taskNumbersArr.map((elm, i) => {
                                    return(
                                        <th key={i}>{elm}</th>
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
                                            const homework:any = studentHomeworks.find(homework => homework.taskNumber == taskNumber)
                                            const grade = studentHomeworks.find(a => a.taskNumber == homework?.taskNumber)?.grades.find(grade => grade.studentUserId == student.id)
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
                    </table> : <></>}

                    {pathname == "/studentPage" && homeworkInfo ? <div className="homework__info">
                        <div className="homework__info-content">
                            <h2 className="info-title"><span className="desc">Title:</span> {homework.title}</h2>
                            <p className=""><span className="desc">Description: </span> {homework.description}</p>
                        </div>
                    </div> : <></>}
                </div>
            </div>
        </div>
    )
}