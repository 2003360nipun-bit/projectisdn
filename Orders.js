import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("isdn_orders") || "[]"));
  }, []);

  return (
    <div>
      <h3>My Orders</h3>
      {orders.length === 0 && <div>No orders placed yet.</div>}
      {orders.map(o => (
        <div key={o.id} style={{background:"#fff", padding:12, borderRadius:8, marginBottom:10}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div><strong>{o.id}</strong> — {new Date(o.createdAt).toLocaleString()}</div>
            <div>Status: <strong>{o.status}</strong></div>
          </div>
          <div style={{marginTop:8}}>
            <table className="table">
              <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
              <tbody>
                {o.items.map(it => (
                  <tr key={it.id}>
                    <td>{it.name}</td>
                    <td>{it.qty}</td>
                    <td>Rs. {it.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{textAlign:"right", fontWeight:700, marginTop:8}}>Total: Rs. {o.total}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
