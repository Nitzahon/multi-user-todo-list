import React from "react";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { fetchTasks } from "@/features/tasks/taskSlice";
import { getUser } from "@/features/users/userSlice";

import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";


const DashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user, loading: userLoading, loaded: userLoaded } = useSelector((state) => state.user);
  const { tasks, loading, loaded } = useSelector((state) => state.tasks);
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  React.useEffect(() => {
    if (!_.isEmpty(user) || userLoading || userLoaded || !isAuthenticated) {
      return;
    }
    dispatch(getUser());
  }, [dispatch, isAuthenticated, user, userLoaded, userLoading])

  React.useEffect(() => {    
    if (!_.isEmpty(tasks) || loading || loaded || !isAuthenticated) {
      return;
    }
    dispatch(fetchTasks());
  }, [dispatch, isAuthenticated, loaded, loading, tasks]);
  
  return <Dashboard tasks={tasks} loading={loading || userLoading} user={user} />;
};

export default DashboardContainer;
