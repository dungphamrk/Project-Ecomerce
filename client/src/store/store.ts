import { configureStore } from "@reduxjs/toolkit";
import  producstReducer  from "./reducers/productsSlice";
const store:any= configureStore({
    reducer:{
        products: producstReducer
    }
})
export default store;