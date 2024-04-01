import { createSlice } from "@reduxjs/toolkit"
import { IGroup, IModuleGroups, ITeacher } from "../type"
import { RootState } from "../../app/store"
import { getAllGroupesAPI, getSingleGroupAPI } from "./groupAPI"
import { getTeacherGroupAndModuleByTokenAPI } from "../teacher/teacherAPI"
import { getGroupByStudentIdAPI } from "../student/studentAPI"

const initialState:{groupes:IGroup[], group:IGroup, tGroups:ITeacher[], sGroups:IGroup[]} = {
    groupes: [],
    group: {} as IGroup,
    tGroups: [],
    sGroups: []
}

export const groupSlice = createSlice({
    name: "group",
    initialState, 
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllGroupesAPI.fulfilled, (state, action) => {
            state.groupes = action.payload
        }).addCase(getSingleGroupAPI.fulfilled, (state, action) => {
            state.group = action.payload
        }).addCase(getTeacherGroupAndModuleByTokenAPI.fulfilled, (state, action) => {
            state.tGroups = action.payload
        }).addCase(getGroupByStudentIdAPI.fulfilled, (state, action) => {
            state.sGroups = action.payload
        })
    },

})

export const {} = groupSlice.actions
export const selectGroup = (state: RootState) => state.group
export default groupSlice.reducer