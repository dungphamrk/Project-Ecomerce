import { configureStore } from "@reduxjs/toolkit";
import  producstReducer  from "./reducers/productsSlice";
import  userReducer  from "./reducers/userSlice";
const store:any= configureStore({
    reducer:{
        products: producstReducer,
        users:userReducer
    }
})
export default store;