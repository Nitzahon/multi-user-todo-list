import PropTypes from "prop-types";

import TaskBoardContainer from "../Taskboard/TaskboardContainer";

const Dashboard = ({ loading }) => {
    if (loading) {
        
        return <div className="home-page">Loading...</div>;
    }

    return (
    <div className="home-page">
      <TaskBoardContainer/>
    </div>
  );
};

Dashboard.propTypes = {
    loading: PropTypes.bool.isRequired,
    };

export default Dashboard;
