import React, { useEffect, useState } from "react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("isdn_orders") || "[]"));
  }, []);

  function updateStatus(id, status) {
    const all = orders.map(o => o.id === id ? {...o, status} : o);
    setOrders(all);
    localStorage.setItem("isdn_orders", JSON.stringify(all));
  }

  return (
    <div>
      <h3>Order Management</h3>
      <table className="table">
        <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th>Items</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.customerName || o.customerEmail || "Unknown"}</td>
              <td>Rs. {o.total}</td>
              <td>{o.status}</td>
              <td>
                <ul style={{margin:0, paddingLeft:16}}>
                  {o.items.map(it => <li key={it.id}>{it.name} x {it.qty}</li>)}
                </ul>
              </td>
              <td>
                <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                  <option>Pending</option>
                  <option>Packing</option>
                  <option>Delivering</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan="7">No orders</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
