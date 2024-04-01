import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";

export const createUserAPI = createAsyncThunk(
    "create User",
    async (userData:{name: string, surname: string, email: string, password: string, phone_number: string, role: number, groupId: number}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.post("/auth/register", userData, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        });
        return data;
    }
);

export const logInAPI = createAsyncThunk(
    "logIn",
    async (userData: { username: string; password: string }) => {
        const { data } = await myAxios.post("/auth/login/", userData);
        localStorage.access_token = JSON.stringify(data.access_token)
        localStorage.role = JSON.stringify(data.role)
        return data;
    }
);

export const logoutAPI = createAsyncThunk(
    "logout",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/auth/logout", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        });
        localStorage.clear()
        return data
    }
)

export const getUserProfileAPI = createAsyncThunk(
    "getUserProfile",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/auth/profile", {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

//UserAPI

export const getAllUsersAPI = createAsyncThunk(
    "getAllUsers",
    async () => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/user", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)


export const getSingleUserAPI = createAsyncThunk(
    "getSingleUser",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.get("/user/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const deleteUserAPI = createAsyncThunk(
    "deleteUser",
    async (id:number) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.delete("/user/" + id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const updateUserDataAPI = createAsyncThunk(
    "updateUserData",
    async (userData:{name:string, surname:string}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.patch("/user/us/updateData", userData, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const changeUserPasswordAPI = createAsyncThunk(
    "changeUserPassword",
    async (changedPassword:{currentPassword: string, password: string, confirmationPassword: string}) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.patch("/user/us/changepassword", changedPassword, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
        return data
    }
)

export const updateUserPictureAPI = createAsyncThunk(
    "updateUserPicture",
    async (file:any) => {
        const access_token = JSON.parse(localStorage.access_token)
        const { data } = await myAxios.patch("/user/updatePicUrl", file ,{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data",
            }
        })
        return data
    }
)

export const userVerifyAPI = createAsyncThunk(
    "userVerifyAPI",
    async ({email, emailToken}:{email:string, emailToken:string}) => {
        const obj = {email:email, emailToken:emailToken}
        const { data } = await myAxios.post("/user/verify", obj)
        console.log(data);
        return data
    }
)

export const forgotPasswordAPI = createAsyncThunk(
    "forgotPassword",
    async (email:string) => {
        const { data } = await myAxios.patch("/user/us/forgotPassword", {email})
        return data
    }
)

export const resetPasswordAPI = createAsyncThunk(
    "resetPassword",
    async ({email, code, password, confirm_password}:{email:string, code:number, password:string, confirm_password:string}) => {
        const obj = {code:code, password:password, confirm_password:confirm_password}
        const { data } = await myAxios.patch(`/user/us/resetPassword/${email}` , obj)
        return data
    }
)