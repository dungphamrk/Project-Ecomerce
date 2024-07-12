import { configureStore } from "@reduxjs/toolkit";
import  producstReducer  from "./reducers/productsSlice";
import  userReducer  from "./reducers/userSlice";
import categoriesSlice from "./reducers/categoriesSlice";
const store:any= configureStore({
    reducer:{
        products: producstReducer,
        users:userReducer,
        categories:categoriesSlice
    }
})
export default store;