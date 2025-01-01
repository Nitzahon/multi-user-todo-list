import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restService from "@/services/RESTService";
import restURLs from "@/services/restUrls";
import { logout } from "@/features/auth/authSlice";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await restService.get(restURLs.tasks);
    console.log(response);

    
    return response; // Return the list of tasks
  } catch (err) {
    return rejectWithValue(err);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logout, (state) => {
        state.tasks = [];
        state.loading = false;
        state.loaded = false;
        state.error = null;
      });
  },
});

export default taskSlice.reducer;
