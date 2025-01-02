import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restService from "@/services/RESTService";
import restURLs from "@/services/restUrls";
import { logout } from "@/features/auth/authSlice";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await restService.get(restURLs.tasks);

    return response; // Return the list of tasks
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createTask = createAsyncThunk("tasks/createTask", async ({ title, description, status, assignedUserId }, { rejectWithValue }) => {
  try {
    await restService.post(restURLs.tasks, null, {
      title,
      description,
      status,
      assignedUserId,
    });

    const response = await restService.get(restURLs.tasks); // Return the list of tasks
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, title, description, status, assignedUserId }, { rejectWithValue }) => {
  try {
    await restService.put(restURLs.taskUpdate, { id }, {
      title,
      description,
      status,
      assignedUserId,
    });

    const response = await restService.get(restURLs.tasks); // Return the list of tasks
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus", async ({ id, status }, { rejectWithValue }) => {
  
  try {
    await restService.patch(restURLs.taskUpdate, { id }, {status});
    const response = await restService.get(restURLs.tasks); // Return the list of tasks
    return response;
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
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.tasks = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
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
