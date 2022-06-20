import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import logo from "../../Images/THESSALY.svg";
import { DATA } from "./sidebar_routes.js";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item_inner ${active}`}>
        {/* <div style={{ display: "flex" }}> */}
        <i style={{ display: "flex" }}>
          {props.icon}
          <span>{props.title}</span>
        </i>
        {/* </div> */}
      </div>
    </div>
  );
};

SidebarItem.propTypes = {
  active: PropTypes.any,
  icon: PropTypes.string,
  title: PropTypes.string,
};

const Sidebar = () => {
  const location = useLocation();
  const activeItem = DATA.findIndex((item) => item.route === location.pathname);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {DATA.map((item, index) => (
        <Link
          to={item.route}
          key={index}
          style={{ textDecoration: "none", fontStyle: "normal" }}
        >
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};
Sidebar.propTypes = {
  activeItem: PropTypes.number,
  location: PropTypes.string,
};

export default Sidebar;
