import { createAsyncThunk } from "@reduxjs/toolkit"
import { myAxios } from "../../app/store"

export const createCourseAPI = createAsyncThunk(
    "createCourse",
    async (course:{name:string}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.post("/course", course, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getAllCoursesAPI = createAsyncThunk(
    "getAllCourses",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/course", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const updateCourseAPI = createAsyncThunk(
    "updateCourse",
    async ({id, newName}:{id:number, newName:string}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const obj = {name: newName}
        const { data } = await myAxios.patch(`/course/${id}`, obj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        return data
    }
)


export const deleteCourseAPI = createAsyncThunk(
    "deleteCourse",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.delete("/course/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)


export const getSingleCourseAPI = createAsyncThunk(
    "getSingleCourse",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/course/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)