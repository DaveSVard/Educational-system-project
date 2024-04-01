import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";

export const createGradeAPI = createAsyncThunk(
    "createGrade",
    async (grade:{rating:number, homeworkId:number, studentId:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.post("/grades", grade, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const getRateByModuleGroupIdAPI = createAsyncThunk(
    "getRateByModuleGroupId",
    async (moduleGroupsId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/grades/getRateByModuleGroupId/" + moduleGroupsId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const deleteGradeAPI = createAsyncThunk(
    "deleteGrade",
    async (gradeId:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.delete("/grades/" + gradeId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)



export const updateGradeAPI = createAsyncThunk(
    "updateGrade",
    async ({gradeId, rating}:{gradeId:number, rating:number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const ratingObj = {rating: rating}
        const { data } = await myAxios.patch(`/grades/${gradeId}` , ratingObj, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)