import { createSlice } from "@reduxjs/toolkit";
import { IGrade } from "../type";
import { RootState } from "../../app/store";
import { getRateByModuleGroupIdAPI } from "./gradeAPI";

const initialState:{grades:IGrade[], grade:IGrade} = {
    grades: [],
    grade: {} as IGrade
}

export const gradeSlice = createSlice({
    name: "grade",
    initialState, 
    reducers: {},
    extraReducers: (build) => {
        
    }
})


export const {} = gradeSlice.actions
export const selectGrade = (state: RootState) => state.grade
export default gradeSlice.reducer