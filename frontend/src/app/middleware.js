import _ from "lodash";

import { logout } from "@/features/auth/authSlice";

export const tokenFailureMiddleware  = (storeAPI) => (next) => async (action) => {
    const { getState, dispatch } = storeAPI;
    
    if (_.isEqual(action.meta?.requestStatus, "rejected") && action.payload?.status === 401) {
        const state = getState();
        const { isAuthenticated } = state.auth;
        console.log({isAuthenticated});
        
        if (isAuthenticated) {
          console.warn("Token invalid or expired. Logging out the user.");
          dispatch(logout(state));
        }
      }
  
    return next(action);
  };