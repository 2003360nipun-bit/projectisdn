import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import BranchOverview from "./BranchOverview";
import StockManagement from "./StockManagement";
import DeliveryManagement from "./DeliveryManagement";
import { AuthContext } from "../../contexts/AuthContext";

export default function HeadOfficeDashboard() {
  const { user, logout } = useContext(AuthContext);
  const links = [
    { to: "/headoffice", label: "Branch Overview" },
    { to: "/headoffice/stock", label: "Stock Management" },
    { to: "/headoffice/delivery", label: "Delivery Management" }
  ];

  return (
    <div className="app-layout">
      <Sidebar links={links} />
      <div className="content">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <h2>Head Office - {user?.name}</h2>
            <div style={{color:"#666"}}>Role: {user?.role}</div>
          </div>
          <div><button onClick={logout}>Logout</button></div>
        </div>

        <Routes>
          <Route path="/" element={<BranchOverview />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="delivery" element={<DeliveryManagement />} />
        </Routes>
      </div>
    </div>
  );
}
