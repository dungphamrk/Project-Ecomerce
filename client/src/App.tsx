import { Route, Routes } from "react-router-dom";
import AdminProductList from "./pages/admin/AdminProductList";
import UserList from "./pages/admin/UserList";
import SideBar from "./components/Admin/SideBar";
import Admin from "./pages/admin/Admin";
import Home from "./pages/admin/Home";
import Register from "./pages/util/Register";
import AdminCategoryList from "./pages/admin/Category";
import Header from "./components/User/Header";
import Footer from "./components/User/Footer";
import ProductOverviews from "./pages/user/ProductOverview";
import CustomerReviews from "./components/Admin/CustomerReview";
import ProductList from "./pages/user/ProductList";
import CategoryFilted from "./pages/user/Categoryfilted";
import SignIn from "./pages/util/SignIn";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<SideBar />}>
        <Route index path="home" element={<Home />} />
        <Route path="adminproducts" element={<AdminProductList />} />
        <Route path="user" element={<UserList />} />
        <Route path="category" element={<AdminCategoryList />} />
      </Route>
      <Route path="login" element={<SignIn/>}/>
      <Route path="/header" element={<Header/>}/>
      <Route path="/footer" element={<Footer/>}/>
      <Route path="/products/:id" element={<ProductOverviews/>}/>
      <Route path="/customer" element ={<CustomerReviews/>}/>
      <Route path="/productList" element={<ProductList/>}/>
      <Route path="/filted/:category" element={<CategoryFilted/>}/>
    </Routes>
  );
}
