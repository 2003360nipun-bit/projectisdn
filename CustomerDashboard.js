// src/components/Customer/CustomerDashboard.js
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import Products from "./Products";
import Cart from "./Cart";
import Orders from "./Orders";
import Payments from "./Payments";
import Profile from "./Profile";
import { AuthContext } from "../../contexts/AuthContext";

export default function CustomerDashboard({ province = "" }) {
  const { logout, user } = useContext(AuthContext);
  const slug = (province || "").toLowerCase().replace(/\s+/g, "-");
  const base = `/customer/${slug}`;

  const links = [
    { to: `${base}`, label: "Dashboard" },
    { to: `${base}/products`, label: "Products" },
    { to: `${base}/cart`, label: "My Cart" },
    { to: `${base}/orders`, label: "My Orders" },
    { to: `${base}/payments`, label: "Payments" },
    { to: `${base}/profile`, label: "Profile" }
  ];

  return (
    <div className="app-layout">
      <Sidebar links={links} />
      <div className="content">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <h2>Welcome, {user?.name} — {province}</h2>
            <div style={{color:"#666"}}>Role: Customer</div>
          </div>
          <div><button onClick={() => logout()}>Logout</button></div>
        </div>

        <Routes>
          {/* index route for /customer/:province */}
          <Route index element={<Products province={province} />} />
          {/* child routes (no leading slash) */}
          <Route path="products" element={<Products province={province} />} />
          <Route path="cart" element={<Cart province={province} />} />
          <Route path="orders" element={<Orders province={province} />} />
          <Route path="payments" element={<Payments province={province} />} />
          <Route path="profile" element={<Profile province={province} />} />
        </Routes>
      </div>
    </div>
  );
}
