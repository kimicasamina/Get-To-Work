import useAddSubtask from "../../hooks/task/useAddSubtask";
import useDeleteTask from "../../hooks/task/useDeleteTask";
import useUpdateTask from "../../hooks/task/useUpdateTask";

const initialValue = [];
const tasksReducer = (tasks = initialValue, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return [...action.payload];

    case "SET_TASKS":
      return [...action.payload];

    case "ADD_TASK":
      return [...tasks, action.payload];

    case "DELETE_TASK":
      const newTasks = useDeleteTask(tasks, action.payload._id);
      return [...newTasks];

    case "UPDATE_TASK": {
      const newTasks = useUpdateTask(tasks, action.payload._id, action.payload);
      console.log(newTasks);
      return [...newTasks];
    }

    case "ADD_SUBTASK": {
      const newTasks = useAddSubtask(
        tasks,
        action.payload.parent,
        action.payload
      );
      console.log(newTasks);
      return [...newTasks];
    }

    default:
      return tasks;
  }
};

export default tasksReducer;
