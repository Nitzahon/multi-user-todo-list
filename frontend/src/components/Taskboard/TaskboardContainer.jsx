import React from "react";

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { updateTaskStatus, updateTask, createTask } from "@/features/tasks/taskSlice";
import { getUsers } from "@/features/users/userSlice";

import TaskBoard from "./TaskBoard";

const filterTasks = (tasks, status) => _.filter(tasks, tasks => tasks.status === status);


const TaskBoardContainer = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { users, loading: usersLoading } = useSelector((state) => state.user);
  
  const onCreateTask = async task => {
    return dispatch(createTask(task));
  }

  const onUpdateTask = async task => {
    return dispatch(updateTask({...task}));
  }

  React.useEffect(() => {    
    if (!_.isEmpty(users) || usersLoading) { return; }
    dispatch(getUsers());
  }, [dispatch, users, usersLoading]);
  const columnsFromBackend = {
    [uuid()]: {
      name: "TODO",
      items: [...filterTasks(tasks, "TODO")]
    },
    [uuid()]: {
      name: "IN PROGRESS",
      items: [...filterTasks(tasks, "IN PROGRESS")]
    },
    [uuid()]: {
      name: "DONE",
      items: [...filterTasks(tasks, "DONE")]
    }
  };
  const [columns, setColumns] = React.useState(columnsFromBackend);

  const [filters, setFilters] = React.useState({
    status: "",
    assignedUserId: "",
  });

  const onDragEnd = (result, dragColumns, setDragColumns) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    console.log(result);
    
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = dragColumns[source.droppableId];
      const destColumn = dragColumns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setDragColumns({
        ...dragColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      
      dispatch(updateTaskStatus({ id: draggableId, status: destColumn.name }));
    } else {
      const column = dragColumns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setDragColumns({
        ...dragColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
    });
    }
  };

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
      <TaskBoard
        columns={columns}
        users={users}
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        onUpdateTask={onUpdateTask}
        onCreateTask={onCreateTask}
      />
    </DragDropContext>
  );
};

export default TaskBoardContainer;
