    import React, { useEffect, useState } from "react";
import "./../../../styles/seeUsers.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectStudent } from "../../../features/student/studentSlice";
import { selectUser } from "../../../features/admin/adminSlice";
import { deleteUserAPI, getAllUsersAPI } from "../../../features/admin/adminAPI";
import { getAllStudentsAPI } from "../../../features/student/studentAPI";
import { selectTeacher } from "../../../features/teacher/teacherSlice";
import { getAllTeachersAPI } from "../../../features/teacher/teacherAPI";
import { Link } from "react-router-dom";

export const Users:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const {users} = useAppSelector(selectUser)
    const {students} = useAppSelector(selectStudent)
    const {teachers} = useAppSelector(selectTeacher)

    useEffect(() => {
        dispatch(getAllUsersAPI())
        dispatch(getAllStudentsAPI())
        dispatch(getAllTeachersAPI())
    }, [])

    const [usersTable, setUsersTable] = useState<boolean>(false)
    const [teacherTable, setTeacherTable] = useState<boolean>(false)
    const [studentTable, setStudentTable] = useState<boolean>(false)

    

    const toggleTable = (selectedTable: string) => {
        if (selectedTable == 'users') {
            setUsersTable(true);
            setTeacherTable(false);
            setStudentTable(false);
        } else if (selectedTable == 'teacher') {
            setUsersTable(false);
            setTeacherTable(true);
            setStudentTable(false);
        } else if (selectedTable == 'student') {
            setUsersTable(false);
            setTeacherTable(false);
            setStudentTable(true);
        }
    };
    

    return(
        <div className="seeUsers">
            <div className="container">
                <div className="seeUsers__wrapper">
                    <div className="seeUsers__title">
                        <h1 className="title">See All Users</h1>
                    </div>

                    <div className="seeUsers__content">
                        <div className="seeUsers__content-title" onClick={() => {
                            usersTable == true ? setUsersTable(false) : toggleTable("users")
                        }}>
                            <h2>All Users</h2>
                        </div>
                        {usersTable ? <table className="seeUsers__content-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(elm => {
                                    return(
                                        <tr key={elm.id}>
                                            <td>{elm.name}</td>
                                            <td>{elm.surname}</td>
                                            <td>
                                                <Link to={"/adminPage/seeSingleUser/" + elm.id}><i className="fa-regular fa-eye"></i></Link>
                                                <button onClick={() => dispatch(deleteUserAPI(elm.id)).then(res => {
                                                    dispatch(getAllUsersAPI())
                                                })} className="delete-btn"><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : <></>}
                    </div>

                    <div className="seeUsers__content">
                        <div className="seeUsers__content-title"  onClick={() => {
                            teacherTable == true ? setTeacherTable(false) : toggleTable("teacher")
                        }}>
                            <h2>All Teacher</h2>
                        </div>
                        {teacherTable ? <table className="seeUsers__content-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map(elm => {
                                    return(
                                        <tr key={elm.userId}>
                                            <td>{elm.user.name}</td>
                                            <td>{elm.user.surname}</td>
                                            <td>{elm.user.email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : <></>}
                    </div>

                    <div className="seeUsers__content">
                        <div className="seeUsers__content-title"  onClick={() => {
                            studentTable == true ? setStudentTable(false) : toggleTable("student")
                        }}>
                            <h2>All Students</h2>
                        </div>  
                        {studentTable ? <table className="seeUsers__content-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(elm => {
                                    return(
                                        <tr key={elm.userId}>
                                            <td>{elm.user.name}</td>
                                            <td>{elm.user.surname}</td>
                                            <td>{elm.user.email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
} 