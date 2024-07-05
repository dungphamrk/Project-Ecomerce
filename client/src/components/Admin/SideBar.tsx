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
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import Navigation from "./Navigation";
export default function SideBar() {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 800px)") .matches
  );
  console.log(broken);

  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="flex">
      <div
        style={{
          height: "100%",
          minHeight: "300px",
          color: "white",
        }}
      >
        <Sidebar
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
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                minWidth: "80px",
                [`&.active`]: {
                  backgroundColor: "#33539e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem icon={<HomeOutlined />}>Home</MenuItem>
            <MenuItem icon={<UserOutlined />}> User</MenuItem>
            <MenuItem icon={<AccountBookOutlined />}>Hóa đơn</MenuItem>
            <MenuItem> Examples</MenuItem>
            <MenuItem></MenuItem>
            <MenuItem> Examples</MenuItem> <MenuItem> Examples</MenuItem>{" "}
            <MenuItem> Examples</MenuItem> <MenuItem> Examples</MenuItem>{" "}
            <MenuItem> Examples</MenuItem> <MenuItem> Examples</MenuItem>{" "}
          </Menu>
        </Sidebar>
      </div>
      <nav className="flex w-11/12 justify-between p-3 text-red-700 h-1/3">
        {broken === true ? (
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            <MenuOutlined />
          </button>
        ) : (
          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuOutlined />
          </button>
        )}
        <div className="flex">
          <BellOutlined />
          <Navigation />
        </div>
      </nav>
    </div>
  );
}
