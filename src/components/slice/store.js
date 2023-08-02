import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";

 const store = configureStore({
    reducer:{
        darkMode:modeSlice,
    }
})
export default store;
