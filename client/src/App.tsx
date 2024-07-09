import { Route, Routes } from "react-router-dom";
import AdminProductList from "./components/Admin/AdminProductList";
import UserList from "./components/Admin/UserList";
import SideBar from "./components/Admin/SideBar";
import Admin from "./pages/admin/Admin";
import Home from "./components/Admin/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/admin" element={<SideBar />}>
        <Route index path="home" element={<Home />} />
        <Route path="products" element={<AdminProductList />} />
        <Route path="user" element={<UserList />} />
      </Route>
    </Routes>
  );
}
