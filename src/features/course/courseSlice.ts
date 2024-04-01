import { createSlice } from "@reduxjs/toolkit"
import { ICourse } from "../type"
import { RootState } from "../../app/store"
import { getAllCoursesAPI, getSingleCourseAPI } from "./courseAPI"

const initialState:{courses:ICourse[], course:ICourse} = {
    courses: [],
    course: {} as ICourse
}

export const courseSlice = createSlice({
    name: "course",
    initialState, 
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllCoursesAPI.fulfilled, (state, action) => {
            state.courses = action.payload
        }).addCase(getSingleCourseAPI.fulfilled, (state, action) => {
            state.course = action.payload
        })
    },

})

export const {} = courseSlice.actions
export const selectCourse = (state: RootState) => state.course
export default courseSlice.reducer