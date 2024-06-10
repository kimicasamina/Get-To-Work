import { combineReducers } from "@reduxjs/toolkit";
import projectsReducer from "./projects";
import tasksReducer from "./tasks";
import uiReducer from "./ui";
import userReducer from "./user";

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
