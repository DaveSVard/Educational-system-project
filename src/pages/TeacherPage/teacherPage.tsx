import React, { useEffect } from "react"
import "./teacherPage.scss"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/admin/adminSlice"
import { getTeacherGroupAndModuleByTokenAPI } from "../../features/teacher/teacherAPI"
import { getUserProfileAPI } from "../../features/admin/adminAPI"
import { selectGroup } from "../../features/group/groupSlice"

export const TeacherPage:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const {user} = useAppSelector(selectUser)
    const {tGroups} = useAppSelector(selectGroup)
    
    useEffect(() => {
        dispatch(getUserProfileAPI())
        dispatch(getTeacherGroupAndModuleByTokenAPI())
    }, [])

    return(
        <div className="teacherPage">
            <div className="container">
                <div className="teacherPage__wrapper">
                    <div className="teacherPage__title">
                        {pathname == "/teacherPage" ? <div>
                            <h1 className="title">Welcome! {user.name} {user.surname}</h1>
                        </div> : <></>}
                    </div>

                    {pathname == "/teacherPage" ? <div className="teacherPage__info">
                        <table className="teacherPage__table">
                            <thead>
                                <tr>
                                    <th>Your Groups</th>
                                    <th>Group modules</th>
                                    <th>Students</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tGroups.map(elm => {
                                    return(
                                        elm.groups?.map((groups, i) => {
                                            return(
                                                <tr key={groups.id}>
                                                    <td>{++i}) {groups.name}</td>
                                                    <td>
                                                        {groups.moduleGroups.map((modules, i) => {
                                                            return(
                                                                <p key={modules.id}>{++i}) {modules.module.name}</p>
                                                            )
                                                        })}
                                                    </td>
                                                    <td>
                                                        {groups.students.map((students, i) => {
                                                            return(
                                                                <p key={students.userId}>{++i}) {students.user.name} {students.user.surname}</p>
                                                            )
                                                        })}
                                                    </td>
                                                </tr>
                                            )
                                        })   
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> : <></>}

                    
                </div>
            </div>
        </div>
    )
}