import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMain } from "../../../axios";
import { IFetchLoginParams, IFetchRegistrationParams, IState, IUserData } from "./types";

const initialState: IState = {
    status: "null",
    data: null,
    error: null,
}

export const fetchLogin = createAsyncThunk(
    "user/login",
    async (params: IFetchLoginParams) => {
        const data = await axiosMain("/user/login", {
            method: "POST",
            data: params
        }).then(res => {
            console.log(res.data.token);
            localStorage.setItem("token", res.data.token);
            return res.data.userData
        }).catch((err) => {
            throw new Error(err)
        })
        return data
    }
)
export const fetchRegistration = createAsyncThunk(
    "user/registration",
    async (params: IFetchRegistrationParams) => {
        const data = await axiosMain("/user/registration", {
            method: "POST",
            data: params
        }).then(res => {
            localStorage.setItem("token", res.data.token);
            return res.data.userData    
        }).catch((err) => {
            throw new Error(err.message);
        });
        return data
    }
)
export const fetchAuth = createAsyncThunk(
    "user/auth",
    async () => {
        const token = localStorage.getItem("token");
        const data = await axiosMain("/user/get-data", {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            return res.data.userData
        }).catch((err) => {
            throw new Error(err);
        })
        return data
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUserData: (state) => {
            localStorage.removeItem("token");
            state.status = "null";
            state.data = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload
        }).addCase(fetchLogin.pending, (state, action) => {
            state.status = "pending";
            state.data = null
        }).addCase(fetchLogin.rejected, (state, action) => {
            console.log(action);
            state.status = "error";
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload
        }).addCase(fetchRegistration.pending, (state, action) => {
            state.status = "pending";
            state.data = null
        }).addCase(fetchRegistration.rejected, (state, action) => {
            console.log(action);
            state.status = "error";
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload
        }).addCase(fetchAuth.pending, (state, action) => {
            state.status = "pending";
            state.data = null
        }).addCase(fetchAuth.rejected, (state, action) => {
            state.status = "error";
            state.data = null;
        })
    },
});

export const {removeUserData} = userSlice.actions;
export default userSlice.reducer;