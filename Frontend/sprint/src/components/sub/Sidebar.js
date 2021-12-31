import React from "react";
import "../stylesheets/Sidebar.css";
import { SidebarData, SidebarDataClient } from "./SidebarData";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              title={val.title}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div>{val.icon}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Sidebar;

export const ClientSidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarDataClient.map((val, key) => {
          return (
            <li
              key={key}
              title={val.title}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div>{val.icon}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
