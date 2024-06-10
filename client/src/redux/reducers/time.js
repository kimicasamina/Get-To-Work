import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  today: [],
  selected: null,
  selected: localStorage.getItem("selected")
    ? JSON.parse(localStorage.getItem("selected"))
    : null,
};

const timeSlice = createSlice({
  name: "time",
  initialState: initialValue,
  reducers: {
    saveTime(state, action) {
      return { ...action.payload };
    },
    createTime(state, action) {
      return { ...action.payload };
    },
    updateTime(state, action) {
      return { duration: action.payload, ...state };
    },
    setIsRunning(state, action) {
      return { ...state, isRunning: action.payload };
    },
    setIsPause(state, action) {
      return { ...state, isPause: action.payload };
    },
    setToday(state, action) {
      return {
        ...state,
        today: action.payload,
      };
    },
    addToday(state, action) {
      return {
        ...state,
        today: [...state.today, action.payload],
      };
    },
    deleteToday(state, action) {
      const newToday = state.today.filter(
        (time) => time._id !== action.payload._id
      );
      return {
        ...state,
        today: [...newToday],
      };
    },
    // setSelectedProject(state, action) {
    //   localStorage.setItem("selected", JSON.stringify(action.payload));
    //   return {
    //     ...state,
    //     selectedProject: action.payload,
    //   };
    // },
  },
});

export const {
  saveTime,
  createTime,
  updateTime,
  setIsPause,
  setIsRunning,
  setToday,
  addToday,
  deleteToday,
  setSelectedProject,
} = timeSlice.actions;
export default timeSlice.reducer;
