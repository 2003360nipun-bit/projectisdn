import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import RDCOverview from "./RDCOverview";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import PaymentManagement from "./PaymentManagement";
import DeliveryManagement from "./DeliveryManagement";
import InventoryManagement from "./InventoryManagement";
import CustomerManagement from "./CustomerManagement";

export default function RDCStaffDashboard() {
  const { logout, user } = useContext(AuthContext);

  const links = [
    { to: "/rdc", label: "Dashboard" },
    { to: "/rdc/products", label: "Product Management" },
    { to: "/rdc/orders", label: "Order Management" },
    { to: "/rdc/payments", label: "Payment Management" },
    { to: "/rdc/delivery", label: "Delivery Management" },
    { to: "/rdc/inventory", label: "Inventory" },
    { to: "/rdc/customers", label: "Customer Management" }
  ];

  return (
    <div className="app-layout">
      <Sidebar links={links} />
      <div className="content">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <h2>RDC Staff - {user?.name}</h2>
            <div style={{color:"#666"}}>Province: {user?.province}</div>
          </div>
          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<RDCOverview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="delivery" element={<DeliveryManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
        </Routes>
      </div>
    </div>
  );
}
