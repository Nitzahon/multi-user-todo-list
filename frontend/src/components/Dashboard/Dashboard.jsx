import { fetchTaskHistory } from "@/features/history/historySlice";
import { dateTimeStringPropType } from "@/utils/propTypes/customPropTypes";
import _ from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const Dashboard = ({ tasks, loading, user }) => {
    const dispatch = useDispatch();
    const getTaskHistory = (taskId) => {
        dispatch(fetchTaskHistory(taskId));
    };
    if (loading) {
        
        return <div className="home-page">Loading...</div>;
    }

    return (
    <div className="home-page">
      <h1>Welcome, {user?.fullName}</h1>
      <h2>Your Tasks</h2>
      <ul>
        {_.map(tasks, (task) => (
          <li key={task.id} onClick={() => getTaskHistory(task.id)}>
            <ol>
              <li>
                Ttile: <strong>{task.title}</strong>
              </li>
              <li>
                Description: {task.description}
              </li>
              <li>
                Status: {task.status}
              </li>
              <li>
                Assigned User: {task.assignedUser}
              </li>
              <li>
                Created Date: {task.createdDate}
              </li>
              </ol>
            <strong>{task.title}</strong> - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

Dashboard.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        assignedUser: PropTypes.string.isRequired,
        createdDate: dateTimeStringPropType.isRequired,
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        fullName: PropTypes.string,
        email: PropTypes.string,
    }),
    };

export default Dashboard;
