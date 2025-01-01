import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RESTService, { setAuthenticationToken } from '@/services/RESTService';
import restURLs from "@/services/restUrls";

const initialState = {
    isAuthenticated: false,
    loading: false,
    loaded: false,
    error: null,
    token: null,

};

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password, storedToken }, { rejectWithValue }) => {
        try {
            let token = storedToken;
            if (!token) {
                if (!email || !password) {
                    return rejectWithValue("Email and password are required");
                }
                const response = await RESTService.post(restURLs.login, null, {
                    email,
                    password,
                });

                token = response.token;
            }
            setAuthenticationToken(token);
            localStorage.setItem("authToken", token);

            return { token };
        } catch (err) {
            return rejectWithValue(err?.message || "Login failed");
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ fullName, email, password, role }, { rejectWithValue }) => {
        try {
            if (!email || !password) {
                return rejectWithValue("Email and password are required");
            }
            await RESTService.post(restURLs.login, null, {
                fullName,
                email,
                password,
                role,
            });
            const loginResponse = await RESTService.post(restURLs.login, null, {
                email,
                password,
            });
            const token = loginResponse.token;
            setAuthenticationToken(token);
            localStorage.setItem("authToken", token);
            return { token }

        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false,
                state.loaded = false,
                state.error = null,
                localStorage.removeItem("authToken");
            setAuthenticationToken(null);
        },
    },
    extraReducers: (builder) => {
        builder
            // Pending state for login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fulfilled state for login
            .addCase(login.fulfilled, (state, action) => {

                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                state.loaded = true;
            })
            // Rejected state for login
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fulfilled state for register
            .addCase(register.fulfilled, (state, action) => {

                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                state.loaded = true;
            })
            // Rejected state for register
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
                state.loaded = true;
            });
    },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
