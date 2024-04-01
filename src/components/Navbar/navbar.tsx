import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteToken,
  selectUser,
  setToken,
} from "../../features/admin/adminSlice";
import { selectCourse } from "../../features/course/courseSlice";
import { selectGroup } from "../../features/group/groupSlice";
import { logoutAPI } from "../../features/admin/adminAPI";

export const Navbar: React.FC = (): JSX.Element => {
  const { token } = useAppSelector(selectUser);
  let role: any = localStorage.role ? JSON.parse(localStorage.role) : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAppSelector(selectUser);
  const { group } = useAppSelector(selectGroup);

  useEffect(() => {
    if (localStorage.access_token)
      dispatch(setToken(JSON.parse(localStorage.access_token)));
  }, []);

  const logout = () => {
    dispatch(logoutAPI());
    dispatch(deleteToken());
    navigate("/");
  };

  const [closedDoor, setClosedDoor] = useState<boolean>(true);

  const btn: any = useRef(null);
  const row: any = useRef(null);

  const mobileNav = () => {
    btn.current.classList.toggle("nav-icon--active");
    row.current.classList.toggle("header__top-row--mobile");
    document.body.classList.toggle("no-scroll");
  };

  const closeMobileNav = () => {
    row.current.classList.remove("header__top-row--mobile");
    btn.current.classList.remove("nav-icon--active");
  };

  return (
    <nav className="nav">
      <div className="container">
        {!token ? (
          <div className="nav__login">
            <NavLink to={"/"}>LogIn</NavLink>
          </div>
        ) : (
          <></>
        )}

        {role == 0 || role == 1 || role == 2 ? (
          <div ref={row} className="nav__row">
            {role == 0 &&
            (pathname == "/adminPage" || pathname == "/settings") ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/adminPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink
                    to={"/adminPage/users"}
                    onClick={() => closeMobileNav()}
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to={"/adminPage/courses"}
                    onClick={() => closeMobileNav()}
                  >
                    Courses
                  </NavLink>
                  <NavLink
                    to={"/adminPage/modules"}
                    onClick={() => closeMobileNav()}
                  >
                    Modules
                  </NavLink>
                  <NavLink
                    to={"/adminPage/groupes"}
                    onClick={() => closeMobileNav()}
                  >
                    Groupes
                  </NavLink>
                  <NavLink to={"/settings"} onClick={() => closeMobileNav()}>
                    Settings
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileNav();
                    }}
                  >
                    {closedDoor ? (
                      <i
                        onMouseEnter={() => setClosedDoor(false)}
                        style={{ color: "white" }}
                        className="fa-solid fa-door-closed black"
                      ></i>
                    ) : (
                      <i
                        onMouseLeave={() => setClosedDoor(true)}
                        style={{ color: "white" }}
                        className="fa-solid fa-door-open black"
                      ></i>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            {role == 0 &&
            (pathname == "/adminPage/users" ||
              pathname == "/adminPage/createUser" ||
              pathname == `/adminPage/seeSingleUser/${user.id}`) ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/adminPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink
                    to={"/adminPage/users"}
                    onClick={() => closeMobileNav()}
                  >
                    See Users
                  </NavLink>
                  <NavLink
                    to={"/adminPage/createUser"}
                    onClick={() => closeMobileNav()}
                  >
                    Create User
                  </NavLink>
                </div>
              </div>
            ) : (
              <></>
            )}

            {role == 0 &&
            (pathname == "/adminPage/courses" ||
              pathname == "/adminPage/createCourse") ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/adminPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink
                    to={"/adminPage/courses"}
                    onClick={() => closeMobileNav()}
                  >
                    See Courses
                  </NavLink>
                  <NavLink
                    to={"/adminPage/createCourse"}
                    onClick={() => closeMobileNav()}
                  >
                    Create Course
                  </NavLink>
                </div>
              </div>
            ) : (
              <></>
            )}

            {role == 0 &&
            (pathname == "/adminPage/modules" ||
              pathname == "/adminPage/createModule") ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/adminPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink
                    to={"/adminPage/modules"}
                    onClick={() => closeMobileNav()}
                  >
                    See Modules
                  </NavLink>
                  <NavLink
                    to={"/adminPage/createModule"}
                    onClick={() => closeMobileNav()}
                  >
                    Create Module
                  </NavLink>
                </div>
              </div>
            ) : (
              <></>
            )}

            {role == 0 &&
            (pathname == "/adminPage/groupes" ||
              pathname == "/adminPage/createGroup" ||
              pathname == `/seeSingleGroup/${group.id}`) ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/adminPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink
                    to={"/adminPage/groupes"}
                    onClick={() => closeMobileNav()}
                  >
                    See Groupes
                  </NavLink>
                  <NavLink
                    to={"/adminPage/createGroup"}
                    onClick={() => closeMobileNav()}
                  >
                    Create Group
                  </NavLink>
                </div>
              </div>
            ) : (
              <></>
            )}

            {role == 1 &&
            (pathname == "/teacherPage" ||
              pathname == "/teacherPage/createHomework" ||
              pathname == "/teacherPage/createGrade" ||
              pathname == "/seeCourses" ||
              pathname == "/seeModules" ||
              pathname == "/seeGroupes" ||
              pathname == `/seeSingleGroup/${group.id}` ||
              pathname == "/settings") ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/teacherPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink
                    to={"/teacherPage/createHomework"}
                    onClick={() => closeMobileNav()}
                  >
                    Homeworks
                  </NavLink>
                  <NavLink to={"/seeCourses"} onClick={() => closeMobileNav()}>
                    See All Courses
                  </NavLink>
                  <NavLink to={"/seeModules"} onClick={() => closeMobileNav()}>
                    See All Modules
                  </NavLink>
                  <NavLink to={"/seeGroupes"} onClick={() => closeMobileNav()}>
                    See All Groupes
                  </NavLink>
                  <NavLink to={"/settings"} onClick={() => closeMobileNav()}>
                    Settings
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileNav();
                    }}
                  >
                    {closedDoor ? (
                      <i
                        onMouseEnter={() => setClosedDoor(false)}
                        style={{ color: "white" }}
                        className="fa-solid fa-door-closed black"
                      ></i>
                    ) : (
                      <i
                        onMouseLeave={() => setClosedDoor(true)}
                        style={{ color: "white" }}
                        className="fa-solid fa-door-open black"
                      ></i>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            {role == 2 &&
            (pathname == "/studentPage" || pathname == "/settings") ? (
              <div className="nav__list">
                <div className="nav__list-items">
                  <NavLink to={"/studentPage"} onClick={() => closeMobileNav()}>
                    Main
                  </NavLink>
                  <NavLink to={"/settings"} onClick={() => closeMobileNav()}>
                    Settings
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileNav();
                    }}
                  >
                    {closedDoor ? (
                      <i
                        onMouseEnter={() => setClosedDoor(false)}
                        style={{ color: "white" }}
                        className="fa-solid fa-door-closed black"
                      ></i>
                    ) : (
                      <i
                        onMouseLeave={() => setClosedDoor(true)}
                        style={{ color: "white" }}
                        className="fa-solid fa-door-open black"
                      ></i>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="nav-btn">
              <button onClick={() => mobileNav()} className="nav-icon-btn">
                <div ref={btn} className="nav-icon"></div>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
