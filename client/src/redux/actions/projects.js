import axios from "axios";

export const getProjects = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/users/${id}/getprojects`);
    dispatch({ type: "GET_PROJECTS", payload: data.project });
  } catch (err) {
    console.log(err);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/projects/create`, project);
    console.log("DATA", data);
    dispatch({ type: "ADD_PROJECT", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateProject = (project, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/projects/${id}/update`, project);
    console.log("DATA", data);
    dispatch({ type: "UPDATE_PROJECT", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/projects/${id}/delete`);
    console.log("DATA", data);
    dispatch({ type: "DELETE_PROJECT", payload: data });
  } catch (err) {
    console.log(err);
  }
};
