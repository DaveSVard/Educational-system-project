import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectGroup } from "../../../features/group/groupSlice";
import { getAllGroupesAPI, getSingleGroupAPI } from "../../../features/group/groupAPI";
import { CreateHomework } from "../../../components/CreateHomework/createHomework";
import { deleteHomeworkAPI, getHomeworkByModuleGroupAPI, getSingleHomeworkAPI } from "../../../features/homework/homeworkAPI";
import { selectHomework } from "../../../features/homework/homeworkSlice";
import { selectStudent } from "../../../features/student/studentSlice";
import { getRateByModuleGroupIdAPI } from "../../../features/grade/gradeAPI";
import { CreateGradeModal } from "../../../components/CreateGradeModal/createGradeModal";
import { UpdateGradeModal } from "../../../components/UpdateGradeModal/updateGradeModal";
import "./homeworks.scss"

export const Homeworks:React.FC = ():JSX.Element => {
    const taskNumbersArr:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const dispatch = useAppDispatch()
    const {groupes, group} = useAppSelector(selectGroup)
    const {homeworks, homework, homeworkGrades} = useAppSelector(selectHomework)
    const {students} = useAppSelector(selectStudent)

    useEffect(() => {
        dispatch(getAllGroupesAPI())
    }, [])

    const [groupModuleSelect, setGroupModuleSelect] = useState<boolean>(false)
    const [chooseBtns, setChooseBtns] = useState<boolean>(false)
    const [homeworkForm, setHomeworkForm] = useState<boolean>(false)
    const [seeHomeworks, setSeeHomeworks] = useState<boolean>(false)
    const [seeSingleHomework, setSeeSingleHomework] = useState<boolean>(false)
    const [seeGradesTable, setSeeGradesTable] = useState<boolean>(false)

    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [createModal, setCreateModal] = useState<boolean>(false)

    const [moduleGroupId, setModuleGroupId] = useState<any>()

    const findGroupSelect = (groupId:number) => {
        setGroupModuleSelect(true)
        dispatch(getSingleGroupAPI(groupId))
    }

    const findSeeHomeworks = () => {
        setSeeHomeworks(true)
        setHomeworkForm(false)
        setSeeGradesTable(false)
        dispatch(getHomeworkByModuleGroupAPI(moduleGroupId))
    }

    const findSingleHomework = (homeworkId:number) => {
        dispatch(getSingleHomeworkAPI(homeworkId))
        setSeeSingleHomework(true)
    }

    const findGrades = () => {
        setSeeGradesTable(true)
        setSeeHomeworks(false)
        setHomeworkForm(false)
        setSeeSingleHomework(false)
        dispatch(getRateByModuleGroupIdAPI(moduleGroupId))
    }

    const [homeworkId, setHomeworkId] = useState<number>(0)
    const [studentId, setStudentId] = useState<number>(0)
    const [gradeId, setGradeId] = useState<number>(0)

    const updateOrAddGrade = (homeworkId:number, studentId:number, grade:any) => {
        if (grade?.rating == 0 || grade?.rating) {
            setUpdateModal(true);
            setGradeId(grade.id);
        } else {
            setCreateModal(true);
            setHomeworkId(homeworkId);
            setStudentId(studentId);
        }
    }
    
    return(
        <div className="homeworks">
            <div className="container">
                <div className="homeworks__wrapper">
                    <h1 className="title">Homeworks</h1>

                    <div className="homeworks__selects">
                        <div className="homeworks__selects-item">
                            <select onChange={(e) => findGroupSelect(+e.target.value)}>
                                <option value="" hidden>Choose group</option>
                                {groupes.map(elm => {
                                    return(
                                        <option value={elm.id} key={elm.id}>{elm.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {groupModuleSelect ? <div className="homeworks__selects-item">
                            <select onChange={(e) => {
                                setChooseBtns(true)
                                setModuleGroupId(+e.target.value)
                            }}>
                                <option value="" hidden>Choose group module</option>
                                {group?.moduleGroups?.map(elm => {
                                    return(
                                        <option value={elm.id} key={elm.id}>{elm?.module?.name}</option>
                                    )
                                })}
                            </select>
                        </div> : <></>}
                    </div>

                    {chooseBtns ? <div className="homeworks__choose-btns">
                        <button onClick={() => {
                            setHomeworkForm(true)
                            setSeeHomeworks(false)
                            setSeeSingleHomework(false)
                            setSeeGradesTable(false)
                        }} className="choose-btn">Add Homework</button>

                        <button onClick={() => findSeeHomeworks()} className="choose-btn">See Homeworks</button>

                        <button onClick={() => findGrades()} className="choose-btn">Add grade</button>
                    </div> : <></>}

                    {homeworkForm ? <div className="homework__form">
                        <CreateHomework moduleGroupsId={moduleGroupId} moduleId={moduleGroupId} setHomeworkForm={setHomeworkForm}/>
                    </div>: <></>}

                    {seeHomeworks ? <div className="homework__seeHomeworks">
                        {homeworks?.length > 0 ? (
                            <select onChange={(e) => findSingleHomework(+e.target.value)} className="homework__seeHomeworks-select"> 
                                <option value="" hidden>Select homework</option>
                                {homeworks.map(elm => {
                                    return(
                                        <option value={elm.id} key={elm.id}>{elm.title}</option>
                                    )
                                })}
                            </select>
                        ) : (
                            <p className="message">No homeworks</p>
                        )}
                    </div> : <></>}

                    {seeSingleHomework ? <div className="seeSingle-homework">
                        <div className="seeSingle-homework__info">
                            <p><span className="desc">Title:</span> {homework.title}</p>
                            <p><span className="desc">Description:</span> {homework.description}</p>
                        </div>
                        <button onClick={() => dispatch(deleteHomeworkAPI(homework.id)).then(res => {
                            dispatch(getHomeworkByModuleGroupAPI(moduleGroupId))
                            setSeeSingleHomework(false)
                        })}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div> : <></>}

                    {seeGradesTable && homeworks?.length > 0 ? (
                        <table className="seeGrades-table">
                            <thead>
                                <tr>
                                    <th>Students</th>
                                    {taskNumbersArr?.map((elm, i) => {
                                        return(
                                            <th key={i}>{elm}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {students?.map(elm => {
                                    return(
                                        <tr key={elm.userId}>
                                            <td>{elm.user.name} {elm.user.surname}</td>
                                            {taskNumbersArr.map((taskNumber, i) => {
                                                const homework:any = homeworks.find(homework => homework.taskNumber == taskNumber);
                                                const grade = homeworkGrades.find(a => a.taskNumber == homework?.taskNumber)?.grades.find(grade => grade.studentUserId == elm.userId)
                                                return (
                                                    <td key={i}>
                                                        <button 
                                                            onClick={() => updateOrAddGrade(homework?.id, elm.userId, grade)}
                                                        >
                                                            {homework ? homework?.taskNumber == taskNumber && grade?.rating == 0 || grade?.rating ? grade?.rating : "-" : null}
                                                        </button>
                                                    </td>
                                                )
                                            })}

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : seeGradesTable && homeworks?.length == 0 ? (
                        <p className="message">No homeworks</p>
                    ) : null}

                    {updateModal ? 
                        <UpdateGradeModal 
                            updateModal = {updateModal} 
                            setUpdateModal = {setUpdateModal} 
                            gradeId = {gradeId}
                            moduleGroupId = {moduleGroupId} 
                        /> : <></>}

                    {createModal ? 
                        <CreateGradeModal 
                            createModal = {createModal} 
                            setCreateModal ={setCreateModal} 
                            homeworkId = {homeworkId}
                            studentId = {studentId}
                            moduleGroupId = {moduleGroupId}
                        /> : <></>}
                </div>
            </div>
        </div>
    )
}