import { createSlice } from "@reduxjs/toolkit";
const initialState={
    mode: JSON.parse(localStorage.getItem("darkMode")) || false,
  }
const modeSlice = createSlice({
  initialState,
  name: "darkMode",
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
      console.log(state.mode)
    },
  },
});
export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer;
