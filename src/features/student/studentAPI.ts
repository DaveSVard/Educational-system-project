import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";

export const getAllStudentsAPI = createAsyncThunk(
    "getAllStudents", 
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/student", {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const changeStudentGroupAPI = createAsyncThunk(
    "getAllStudents", 
    async ({groupId, userId}:{groupId:number, userId:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.patch("/student/updateGroup/" + userId, groupId, {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getStudentsByGroupIdAPI = createAsyncThunk(
    "getStudentsByGroupId", 
    async (groupId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/student/getStudentByGroupId/" + groupId, {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)


export const getGroupByStudentIdAPI = createAsyncThunk(
    "getGroupByStudentId", 
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/student/getGroupByStudentId/find", {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getHomeworkStudentByModuleIdAPI = createAsyncThunk(
    "getHomeworkStudentByModuleId", 
    async (moduleId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/student/getHomeworkStudentByModuleId/" + moduleId , {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

