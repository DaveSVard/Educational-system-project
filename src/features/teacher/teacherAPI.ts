import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";

export const getAllTeachersAPI = createAsyncThunk(
    "getAllTeachers", 
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/teacher", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getTeacherGroupAndModuleByTokenAPI = createAsyncThunk(
    "getTeacherGroupAndModuleByToken",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/teacher/getTeacherGroupAndModuleByToken/find", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)