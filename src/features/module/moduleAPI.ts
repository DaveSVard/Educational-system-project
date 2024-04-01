import { createAsyncThunk } from "@reduxjs/toolkit"
import { myAxios } from "../../app/store"

export const createModuleAPI = createAsyncThunk(
    "createModule",
    async (module:{name:string, courseId:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.post("/module", module, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getAllModulesAPI = createAsyncThunk(
    "getAllModules",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/module", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const updateModuleAPI = createAsyncThunk(
    "updateModule",
    async ({id, newName}:{id:number, newName:string}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const obj = {name: newName}
        const { data } = await myAxios.patch(`/module/${id}`, obj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        return data
    }
)

export const deleteModuleAPI = createAsyncThunk(
    "deleteModule",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.delete("/module/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const changeModuleCourseAPI = createAsyncThunk(
    "changeModuleCourse",
    async ({moduleId, courseId}:{moduleId:number, courseId:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const obj = {courseId: courseId}
        const { data } = await myAxios.patch("/module/changeCourse/" + moduleId , obj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getSingleModuleAPI = createAsyncThunk(
    "getSingleModule",
    async (moduleId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/module/" + moduleId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getModuleByCourseIdAPI = createAsyncThunk(
    "getModuleByCourseId",
    async (courseId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/module/findByCourseId/" + courseId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)
