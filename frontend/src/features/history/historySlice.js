import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restService from "@/services/RESTService";
import restURLs from "@/services/restUrls";
import { logout } from "@/features/auth/authSlice";


// Async thunk to fetch task history
export const fetchTaskHistory = createAsyncThunk(
  "tasks/fetchTaskHistory",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await restService.get(restURLs.taskHistory, {taskId});
      return { taskId, history: response };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: {},
    loading: false,
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchTaskHistory
      .addCase(fetchTaskHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.history[action.payload.taskId] = action.payload.history;
      })
      .addCase(fetchTaskHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.taskHistory = {};
        state.loading = false;
        state.loaded = false;
        state.error = null;
      });
  },
});

export default historySlice.reducer;
