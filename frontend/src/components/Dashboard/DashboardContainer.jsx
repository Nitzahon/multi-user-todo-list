import React from "react";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { fetchTasks } from "@/features/tasks/taskSlice";
import { getUser } from "@/features/users/userSlice";

import Dashboard from "./Dashboard";


const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading} = useSelector((state) => state.user);
  const { tasks, loading } = useSelector((state) => state.tasks);
  
  React.useEffect(() => {
    if (!_.isEmpty(user) || userLoading) {
      return;
    }
    dispatch(getUser());
  }, [dispatch, user, userLoading])

  React.useEffect(() => {    
    if (!_.isEmpty(tasks) || loading) {
      return;
    }
    dispatch(fetchTasks());
  }, [dispatch, loading, tasks]);
  
  return <Dashboard loading={loading}/>;
};

export default DashboardContainer;
