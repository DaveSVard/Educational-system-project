import { createSlice } from "@reduxjs/toolkit"
import { IModule } from "../type"
import { RootState } from "../../app/store"
import { getAllModulesAPI, getSingleModuleAPI } from "./moduleAPI"

const initialState:{modules:IModule[], module:IModule} = {
    modules: [],
    module: {} as IModule
}

export const moduleSlice = createSlice({
    name: "module",
    initialState, 
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getAllModulesAPI.fulfilled, (state, action) => {
            state.modules = action.payload
        }).addCase(getSingleModuleAPI.fulfilled, (state, action) => {
            state.module = action.payload
        })
    },
})

export const {} = moduleSlice.actions
export const selectModule = (state: RootState) => state.module
export default moduleSlice.reducer