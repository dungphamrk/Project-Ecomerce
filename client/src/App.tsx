import React from "react";
import Admin from "./pages/Admin";
import SideBar from "./components/Admin/SideBar";
import Navigation from "./components/Admin/Navigation";
import AdminProductList from "./components/Admin/AdminProductList";
import SignIn from "./components/Admin/SignIn";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Admin/Register";

export default function App() {
  return (
  <Routes>
    <Route path="/login" element={<SignIn></SignIn>}></Route>
    <Route path="/register" element={<Register></Register>}></Route>
    <Route path="/admin" element={<AdminProductList></AdminProductList>}></Route>
  </Routes>
  );
}
