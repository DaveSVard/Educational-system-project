import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { Layout } from "../pages/Layout/layout";
import { AdminPage } from "../pages/AdminPage/adminPage";
import { TeacherPage } from "../pages/TeacherPage/teacherPage";
import { StudentPage } from "../pages/StudentPage/studentPade";
import { Login } from "../pages/Login/login";
import { Users } from "../pages/AdminPage/Users/users";
import { CreateUser } from "../pages/AdminPage/Users/CreateUser/createUser";
import { Courses } from "../pages/AdminPage/Courses/courses";
import { CreateCourse } from "../pages/AdminPage/Courses/CreateCourse/createCourse";
import { Modules } from "../pages/AdminPage/Modules/modules";
import { CreateModule } from "../pages/AdminPage/Modules/CreateModule/createModule";
import { Groupes } from "../pages/AdminPage/Groupes/groupes";
import { CreateGroupe } from "../pages/AdminPage/Groupes/CreateGroup/createGroup";
import { SeeSingleUser } from "../pages/AdminPage/Users/SeeSingleUser/seeSingleUser";
import { SeeSingleGroup } from "../pages/SeeSingleGroup/seeSingleGroup";
import { Homeworks } from "../pages/TeacherPage/Homeworks/homeworks";
import { SeeCourses } from "../pages/SeeCourses/seeCourses";
import { SeeModules } from "../pages/SeeModules/seeModules";
import { SeeGroupes } from "../pages/SeeGroups/seeGroups";
import { Settings } from "../pages/Settings/settings";
import { ForgetPasswordForm } from "../components/ForgetPasswordForm/forgetPasswordForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm/resetPasswordForm";
import { MyError } from "../pages/MyError/myError";
import { Verify } from "../pages/Verify/verify";


export const MyRouter:React.FC = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {path: "/", element: <Login/>},
                { 
                    path: "/adminPage/", 
                    element: <>
                        <AdminPage/> 
                        <Outlet/>
                    </>,
                    children: [
                        {path: "/adminPage/users", element: <Users/>},
                        {path: "/adminPage/createUser", element: <CreateUser/>},
                        {path: "/adminPage/seeSingleUser/:id", element: <SeeSingleUser/>},

                        {path: "/adminPage/courses", element: <Courses/>},
                        {path: "/adminPage/createCourse", element: <CreateCourse/>},

                        {path: "/adminPage/modules", element: <Modules/>},
                        {path: "/adminPage/createModule", element: <CreateModule/>},

                        {path: "/adminPage/groupes", element: <Groupes/>},
                        {path: "/adminPage/createGroup", element: <CreateGroupe/>},
                    ]
                },
                {
                    path: "/teacherPage", 
                    element: <>
                        <TeacherPage/>
                        <Outlet/>
                    </>,
                    children: [
                        {path: "/teacherPage/createHomework", element: <Homeworks/>},

                    ]
                },
                {
                    path: "/studentPage", 
                    element: <>
                        <StudentPage/>
                        <Outlet/>
                    </>,
                    children: [ 

                    ]
                },
                {path: "/seeCourses", element: <SeeCourses/>},
                {path: "/seeModules", element: <SeeModules/>},
                {path: "/seeGroupes", element: <SeeGroupes/>},
                {path: "/seeSingleGroup/:id", element: <SeeSingleGroup/>},
                {path: "/settings", element: <Settings/>},
                {path: "/forgetPassword", element: <ForgetPasswordForm/>},
                {path: "/resetPassword/:id", element: <ResetPasswordForm/>},
                
            ]
        },
        {path: "*", element: <MyError/>},
        {path: "verify", element: <Verify/>}
    ])

    return routes
}



