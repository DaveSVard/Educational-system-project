import { createSlice } from "@reduxjs/toolkit";
import { User } from "../type";
import { RootState } from "../../app/store";
import { getAllUsersAPI, getSingleUserAPI, getUserProfileAPI } from "./adminAPI";

const initialState:{users:User[], user:User, token:string|null} = {
    users: [],
    user: {} as User,
    token: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        deleteToken: (state) => {
            state.token = null
        }
    },
    extraReducers: (build) => {
        build.addCase(getUserProfileAPI.fulfilled, (state, action) => {
            state.user = action.payload
        }).addCase(getAllUsersAPI.fulfilled, (state, action) => {
            state.users = action.payload
        }).addCase(getSingleUserAPI.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export const {setToken, deleteToken} = adminSlice.actions
export const selectUser = (state: RootState) => state.admin
export default adminSlice.reducer