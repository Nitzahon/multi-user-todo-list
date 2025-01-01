import { configureStore } from '@reduxjs/toolkit';
import authReducer, {login} from '@/features/auth/authSlice';
import userReducer from '@/features/users/userSlice';
import taskReducer from '@/features/tasks/taskSlice';
import historyReducer from '@/features/history/historySlice';
import { tokenFailureMiddleware } from './middleware';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        tasks: taskReducer,
        history: historyReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tokenFailureMiddleware),
});

const storedToken = localStorage.getItem("authToken");
if (storedToken) {
  store.dispatch(login({ storedToken }));
}

export default store;
