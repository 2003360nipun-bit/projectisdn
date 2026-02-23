import React, { useEffect, useState } from "react";

export default function RDCOverview() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("isdn_orders") || "[]"));
    setProducts(JSON.parse(localStorage.getItem("isdn_products") || "[]"));
  }, []);

  const lowStock = products.filter(p => (p.stock || 0) <= (p.lowThreshold || 10));
  const weeklySales = orders
    .filter(o => new Date(o.createdAt) > new Date(Date.now() - 7*24*60*60*1000))
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <h3>RDC Dashboard</h3>
      <div className="kpi">
        <div className="card">
          <div style={{fontSize:16}}>Existing Orders</div>
          <div style={{fontWeight:700, fontSize:20}}>{orders.length}</div>
        </div>
        <div className="card">
          <div style={{fontSize:16}}>Available Products</div>
          <div style={{fontWeight:700, fontSize:20}}>{products.length}</div>
        </div>
        <div className="card">
          <div style={{fontSize:16}}>Low Stock Products</div>
          <div style={{fontWeight:700, fontSize:20}}>{lowStock.length}</div>
        </div>
        <div className="card">
          <div style={{fontSize:16}}>Total Sales (7 days)</div>
          <div style={{fontWeight:700, fontSize:20}}>Rs. {weeklySales}</div>
        </div>
      </div>
    </div>
  );
}
