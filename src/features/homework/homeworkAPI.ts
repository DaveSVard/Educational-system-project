import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";

export const createHomeworkAPI = createAsyncThunk(
    "createHomework",
    async (homework:{taskNumber:number, title:string, description:string, moduleGroupsId:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.post("/homework", homework, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getSingleHomeworkAPI = createAsyncThunk(
    "getSingleHomeworks",
    async (homeworkId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/homework/" + homeworkId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const deleteHomeworkAPI = createAsyncThunk(
    "deleteHomeworks",
    async (homeworkId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.delete("/homework/" + homeworkId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getHomeworkByModuleGroupAPI = createAsyncThunk(
    "getHomeworkByModuleGroup",
    async (moduleGroupsId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/homework/findHomeworksByModuleGroupId/" + moduleGroupsId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)