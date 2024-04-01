import { createSlice } from "@reduxjs/toolkit";
import { ITeacher } from "../type";
import { RootState } from "../../app/store";
import { getAllTeachersAPI, getTeacherGroupAndModuleByTokenAPI } from "./teacherAPI";

const initialState:{teachers:ITeacher[], teacher:ITeacher} = {
    teachers: [],
    teacher: {} as ITeacher
}

export const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllTeachersAPI.fulfilled, (state, action) => {
            state.teachers = action.payload
        })
        // .addCase(getTeacherGroupAndModuleByTokenAPI.fulfilled, (state, action) => {
        //     state.teacher = action.payload
        // })
    }
})

export const {} = teacherSlice.actions
export const selectTeacher = (state: RootState) => state.teacher
export default teacherSlice.reducer