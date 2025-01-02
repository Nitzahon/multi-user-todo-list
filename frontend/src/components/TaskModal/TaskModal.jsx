import React from "react";
import PropTypes from "prop-types";

import styles from "./TaskModal.module.scss";
import HistoryListContainer from "../HistoryList/HistoryListContainer";

const TaskModal = ({ users, isOpen, onClose, onSubmit, task = {} }) => {
  const [formData, setFormData] = React.useState({
    id: null,
    title: "",
    description: "",
    status: "TODO",
    assignedUserId: "",
  });

  React.useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        id: null,
        title: "",
        description: "",
        status: "TODO",
        assignedUserId: "",
        dueDate: "",
      });
    }
  }, [task]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className={styles.root}>
      <div className={styles.modalContent}>
        <h2>{formData.id ? "Edit Task" : "Create Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <select
              disabled={formData.id === null}
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="TODO">TODO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </label>
          <label>
            Assignee:
            <select
            name="assignedUserId"
              disabled={users.length < 2}
              value={formData.assignedUserId}
              onChange={handleChange}
            >
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>

          </label>
          <div className={styles.modalActions}>
            <button type="submit">
              {formData.id ? "Update Task" : "Create Task"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
          {task.id && <HistoryListContainer id={task.id}/>}
        </form>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    assignedUserId: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
};

export default TaskModal;
