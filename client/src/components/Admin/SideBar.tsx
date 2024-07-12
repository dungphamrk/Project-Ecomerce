import {
  AccountBookOutlined,
  BellOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  menuClasses,
} from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

export default function SideBar() {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 800px)").matches
  );
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  
  React.useEffect(() => {
    const handleResize = () => setBroken(window.matchMedia("(max-width: 800px)").matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar className="text-white hover:bg-black"
        width="250px"
        collapsed={collapsed}
        backgroundColor="#031525"
        onBackdropClick={() => setToggled(false)}
        transitionDuration={1000}
        toggled={toggled}
        customBreakPoint="800px"
        onBreakPoint={setBroken}
        rootStyles={{
          minWidth: "80px",
          minHeight: "100%",
        }}
      >
        <Menu
          rootStyles={{
            [`.${menuClasses.icon}`]: {
              borderRadius: "100%",
              backgroundColor: "#33539e",
              color: "##96a7bf",
            },
          }}
          menuItemStyles={{
            button: {
              minWidth: "80px",
              [`&.active`]: {
                backgroundColor: "#33539e",
                color: "#b6c8d9",
              },
              '&:hover': {
                backgroundColor: '#0f243a',
              },
            },
          }}
        >
          <MenuItem onClick={() => navigate('/admin/home')} icon={<HomeOutlined />}>Home</MenuItem>
          <MenuItem onClick={() => navigate('/admin/user')} icon={<UserOutlined />}>User</MenuItem>
          <MenuItem onClick={() => navigate('/admin')} icon={<DashboardOutlined />}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate('/admin/category')} icon={<AppstoreOutlined/>}>Danh mục</MenuItem>
          <MenuItem onClick={() => navigate('/admin')} icon={<AccountBookOutlined />}>Hóa đơn</MenuItem>
          <MenuItem onClick={() => navigate('/admin/products')} icon={<ShoppingCartOutlined/>}>Product</MenuItem>
        </Menu>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <nav className="flex justify-between items-center p-3 bg-white shadow-md">
          {broken ? (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              <MenuOutlined />
            </button>
          ) : (
            <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </button>
          )}
          <div className="flex items-center space-x-4">
            <BellOutlined className="text-red-700" />
            <Navigation/>
          </div>
        </nav>
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
