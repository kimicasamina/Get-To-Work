import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isModal: false,
  selectedProject: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialValue,
  reducers: {
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
  },
});

export const { setIsModal, setSelectedProject } = uiSlice.actions;
export default uiSlice.reducer;
