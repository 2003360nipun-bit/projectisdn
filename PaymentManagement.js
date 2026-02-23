import React, { useEffect, useState } from "react";

export default function PaymentManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("isdn_orders") || "[]"));
  }, []);

  function setPaymentStatus(id, status, amount=0) {
    const all = orders.map(o => o.id === id ? {...o, paymentStatus: status, paidAmount: amount} : o);
    setOrders(all);
    localStorage.setItem("isdn_orders", JSON.stringify(all));
  }

  return (
    <div>
      <h3>Payment Management</h3>
      <table className="table">
        <thead><tr><th>Order ID</th><th>Total</th><th>Paid</th><th>Payment Status</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>Rs. {o.total}</td>
              <td>Rs. {o.paidAmount || 0}</td>
              <td>{o.paymentStatus || "Not Paid"}</td>
              <td>
                <button onClick={() => setPaymentStatus(o.id, "Paid", o.total)}>Mark Paid</button>
                <button onClick={() => setPaymentStatus(o.id, "Advance", Math.round(o.total * 0.3))}>Mark Advance</button>
                <button className="secondary" onClick={() => setPaymentStatus(o.id, "Not Paid", 0)}>Mark Not Paid</button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan="5">No orders</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
