import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Payments() {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const orderIdFromNav = location.state?.orderId;

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("isdn_orders") || "[]"));
  }, []);

  function pay(orderId) {
    // simulate payment success
    const all = JSON.parse(localStorage.getItem("isdn_orders") || "[]");
    const idx = all.findIndex(o => o.id === orderId);
    if (idx === -1) { alert("Order not found"); return; }
    all[idx].status = "Paid";
    localStorage.setItem("isdn_orders", JSON.stringify(all));
    setOrders(all);
    alert("Payment successful");
  }

  return (
    <div>
      <h3>Payments</h3>
      {orderIdFromNav && <div style={{marginBottom:10}}>You just placed order <strong>{orderIdFromNav}</strong>. Please pay to complete the order.</div>}
      <div className="cart-list">
        {orders.length === 0 && <div>No orders yet</div>}
        {orders.length > 0 && (
          <table className="table">
            <thead><tr><th>Order ID</th><th>Date</th><th>Total</th><th>Status</th><th>Invoice</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>Rs. {o.total}</td>
                  <td>{o.status}</td>
                  <td>
                    <button onClick={() => pay(o.id)} disabled={o.status === "Paid"}>{o.status === "Paid" ? "Paid" : "Pay"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
