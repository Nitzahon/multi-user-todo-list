import React from "react";

import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import _ from "lodash";

import styles from "./TaskBoard.module.scss";
import TaskModal from "../TaskModal/TaskModal";

const statuses = ["TODO", "IN PROGRESS", "DONE"];

const TaskBoard = ({
  users = [],
  columns,
  filters,
  setFilters,
  onCreateTask,
  onUpdateTask,
}) => {
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleModalSubmit = async task => {
    console.log({task});
    
    if (task.id) {
      await onUpdateTask(task);
    } else {
      await onCreateTask(task);
    }
    setModalOpen(false)
  };
  console.log({users});
  
  const renderColumns = ([columnId, column]) => {
    return (
      <div key={columnId} className={styles.taskColumn}>
        <h3>{column.name}</h3>
        <Droppable droppableId={columnId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.taskColumnContent}
            >
              {column.items.map(
                (task, index) => (
                  (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={classNames(styles.taskCard, {
                            [styles.filtered]:
                              (filters?.status &&
                                task.status !== filters.status) ||
                              (filters?.assignedUserId &&
                                task.assignedUserId !== filters.assignedUserId),
                          })}
                          onClick={() => handleTaskClick(task)}
                        >
                          <h4>{task.title}</h4>
                          <p>
                            Created:{" "}
                            {new Date(task.createdDate).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  )
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  return (
    <div className={styles.root}>
    <button onClick={handleCreateClick}>Create Task</button>
      <div className={styles.filter}>
        <select
          value={filters?.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filter}>
        <select
          disabled={users.length <= 1}
          value={filters.assignedUserId}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, assignedUserId: e.target.value }))
          }
        >
          <option value="">All Users</option>
          {users.length > 1
            ? users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))
            : null}
        </select>
      </div>

      <div className={styles.taskColumns}>
        {_.chain(columns)
          .entries()
          .map(([columnId, column], index) => {
            return renderColumns([columnId, column], index);
          })
          .value()}
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        task={selectedTask}
        users={users}
      />
    </div>
  );
};

TaskBoard.propTypes = {
  columns: PropTypes.object,
  filters: PropTypes.shape({
    status: PropTypes.oneOf(["", "To Do", "In Progress", "Done"]).isRequired,
    assignedUserId: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  setFilters: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskBoard;
