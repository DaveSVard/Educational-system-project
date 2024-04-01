import { createSlice } from "@reduxjs/toolkit";
import { IHomework } from "../type";
import { RootState } from "../../app/store";
import { getHomeworkByModuleGroupAPI, getSingleHomeworkAPI } from "./homeworkAPI";
import { getRateByModuleGroupIdAPI } from "../grade/gradeAPI";
import { getHomeworkStudentByModuleIdAPI } from "../student/studentAPI";

const initialState:{homeworks:IHomework[], homework:IHomework, homeworkGrades:IHomework[], studentHomeworks:IHomework[]} = {
    homeworks: [],
    homework: {} as IHomework,
    homeworkGrades: [],
    studentHomeworks: [],
}

export const homeworkSlice = createSlice({
    name: "homework",
    initialState, 
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getSingleHomeworkAPI.fulfilled, (state, action) => {
            state.homework = action.payload
        }).addCase(getHomeworkByModuleGroupAPI.fulfilled, (state, action) => {
            state.homeworks = action.payload
        }).addCase(getRateByModuleGroupIdAPI.fulfilled, (state, action) => {
            state.homeworks = action.payload.homeworks
            state.homeworkGrades = action.payload.grades
        }).addCase(getHomeworkStudentByModuleIdAPI.fulfilled, (state, action) => {
            state.studentHomeworks = action.payload.homework[0]
        })
    }
})


export const {} = homeworkSlice.actions
export const selectHomework = (state: RootState) => state.homework
export default homeworkSlice.reducer