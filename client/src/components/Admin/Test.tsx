import {
    AccountBookOutlined,
    BellOutlined,
    HomeOutlined,
    MenuOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import React from "react";
  import {
    Sidebar,
    Menu,
    MenuItem,
    menuClasses,
  } from "react-pro-sidebar";
import Navigation from "./Navigation";
import AdminProductList from "./AdminProductList";
  
  export default function SideBar() {
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(
      window.matchMedia("(max-width: 800px)").matches
    );
  
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
                backgroundColor: "#e1e1e1",
                color: "#344cff",
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
                  backgroundColor: '#aaa',
                  color: 'black',
                },
              },
            }}
          >
            <MenuItem 
              rootStyles={{
                '& .ps-menu-button': {
                  backgroundColor: '#eaabff',
                  color: '#9f0099',
                  '&:hover': {
                    backgroundColor: '#aaa' ,
                    color: 'black',
                  },
                },
              }}
              icon={<HomeOutlined />}
            >
              Home
            </MenuItem>
            <MenuItem icon={<UserOutlined />}>User</MenuItem>
            <MenuItem icon={<AccountBookOutlined />}>Hóa đơn</MenuItem>
            <MenuItem>Examples</MenuItem>
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
            <AdminProductList/>
          </div>
        </div>
      </div>
    );
  }
  