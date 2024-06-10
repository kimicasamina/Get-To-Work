import axios from "axios";
export const getTasks = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/projects/${id}/gettasks`);
    dispatch({ type: "GET_TASKS", payload: data.tasks });
  } catch (err) {
    console.log(err);
  }
};

export const setTasks = (tasks) => async (dispatch) => {
  try {
    // const { data } = await axios.get(`/projects/${id}/gettasks`);
    dispatch({ type: "SET_TASKS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const addTask = (task, id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/projects/${id}/addtask`, task);
    console.log("addTask", data);
    dispatch({ type: "ADD_TASK", payload: data });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (task, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/tasks/${id}/updatetask`, task);
    console.log(data);
    dispatch({ type: "UPDATE_TASK", payload: data });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addSubtask = (newTask, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/tasks/${id}/addsubtask`, newTask);
    // console.log(oldTask, newTask);
    dispatch({
      type: "ADD_SUBTASK",
      payload: data,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/tasks/${id}/deletetask`);
    dispatch({
      type: "DELETE_TASK",
      payload: data.task,
    });
  } catch (err) {
    console.log(err);
  }
};

export const insertSubtask = (newTask, prevTaskId) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `/tasks/${prevTaskId}/insertsubtask`,
      newTask
    );
    console.log(newTask, prevTaskId);
    dispatch({
      type: "UPDATE_SUBTASK",
      payload: data,
    });
    return { data };
  } catch (err) {
    console.log(err);
  }
};
