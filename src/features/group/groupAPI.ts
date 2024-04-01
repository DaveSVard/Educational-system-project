import { createAsyncThunk } from "@reduxjs/toolkit"
import { myAxios } from "../../app/store"

export const createGroupAPI = createAsyncThunk(
    "createGroup",
    async (group:{name:string, teacherId:number, activeModuleId:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.post("/group", group, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getAllGroupesAPI = createAsyncThunk(
    "getAllGroupes",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/group", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)


export const updateGroupAPI = createAsyncThunk(
    "updateGroup",
    async ({id, newName}:{id:number, newName:string}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const obj = {name: newName}
        const { data } = await myAxios.patch(`/group/updateName/${id}`, obj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        return data
    }
)

export const deleteGroupAPI = createAsyncThunk(
    "deleteGroup",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.delete("/group/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const changeGroupTeacherAPI = createAsyncThunk(
    "changeGroupTeacher",
    async ({id, newTeacher}:{id:number, newTeacher:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const obj = {teacherId: newTeacher}
        const { data } = await myAxios.patch(`/group/updateTeacher/${id}`, obj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        return data
    }
)   

export const changeGroupModuleAPI = createAsyncThunk(
    "changeGroupModule",
    async ({id, newModule}:{id:number, newModule:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const obj = {activeModuleId: newModule}
        const { data } = await myAxios.patch(`/group/updateModule/${id}`, obj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        return data
    }
)   


export const getSingleGroupAPI = createAsyncThunk(
    "getSingleGroup",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/group/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)