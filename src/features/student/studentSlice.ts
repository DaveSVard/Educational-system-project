import { createSlice } from "@reduxjs/toolkit";
import { IStudent, IStudents } from "../type";
import { RootState } from "../../app/store";
import { getAllStudentsAPI, getStudentsByGroupIdAPI } from "./studentAPI";
import { getRateByModuleGroupIdAPI } from "../grade/gradeAPI";

const initialState:{students:IStudent[], student:IStudent, studentsGroup:IStudents[]} = {
    students: [],
    student: {} as IStudent,
    studentsGroup: []
}

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllStudentsAPI.fulfilled, (state, action) => {
            state.students = action.payload
        }).addCase(getStudentsByGroupIdAPI.fulfilled, (state, action) => {
            state.studentsGroup = action.payload
        }).addCase(getRateByModuleGroupIdAPI.fulfilled, (state, action) => {
            state.students = action.payload.students
        })
    }
})

export const {} = studentSlice.actions
export const selectStudent = (state: RootState) => state.student
export default studentSlice.reducer