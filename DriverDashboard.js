import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import DriverHome from "./DriverHome";
import DriverProfile from "./DriverProfile";

export default function DriverDashboard() {
  const { user, logout } = useContext(AuthContext);
  const links = [
    { to: "/driver", label: "Driver Dashboard" },
    { to: "/driver/profile", label: "Driver Profile" }
  ];

  return (
    <div className="app-layout">
      <Sidebar links={links} />
      <div className="content">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <h2>Driver - {user?.name}</h2>
            <div style={{color:"#666"}}>Province: {user?.province}</div>
          </div>
          <div><button onClick={logout}>Logout</button></div>
        </div>

        <Routes>
          <Route path="/" element={<DriverHome />} />
          <Route path="profile" element={<DriverProfile />} />
        </Routes>
      </div>
    </div>
  );
}
