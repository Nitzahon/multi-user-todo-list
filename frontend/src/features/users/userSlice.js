import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RESTService from '@/services/RESTService';
import restURLs from "@/services/restUrls";
import { logout } from '@/features/auth/authSlice';

const initialState = {
    loading: false,
    loaded: false,
    error: null,
    user: {},
    users: [],

};

export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        try {

            return RESTService.get(restURLs.user, null);
        } catch (err) {

            return rejectWithValue(err);
        }
    },
);

export const getUsers = createAsyncThunk(
    "users/get",
    async (_, { rejectWithValue }) => {
        try {

            return RESTService.get(restURLs.users);
        } catch (err) {

            return rejectWithValue(err);
        }
    },
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending state for login
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fulfilled state for login
            .addCase(getUser.fulfilled, (state, action) => {

                state.user = action.payload;
                state.loading = false;
                state.loaded = true;
            })
            // Rejected state for login
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fulfilled state for login
            .addCase(getUsers.fulfilled, (state, action) => {

                state.users = action.payload;
                state.loading = false;
                state.loaded = true;
            })
            // Rejected state for login
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(logout, (state) => {
                state.user = {};
                state.loading = false;
                state.loading = false;
                state.error = null;
            });
    },
});


export default userSlice.reducer;
