import React, { useEffect, useState } from "react";

export default function DriverHome() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetch('/api/drivers/me/deliveries', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } // or your auth method
    })
      .then(r => r.json())
      .then(setDeliveries)
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Assigned Deliveries</h3>
      <table className="table">
        <thead>
          <tr><th>Delivery ID</th><th>Status</th><th>Assigned At</th><th>ETA (mins)</th><th>Location</th><th>Order</th><th>Customer</th></tr>
        </thead>
        <tbody>
          {deliveries.map(d => (
            <tr key={d.deliveryId}>
              <td>{d.deliveryId}</td>
              <td>{d.status}</td>
              <td>{d.assignedAt ? new Date(d.assignedAt).toLocaleString() : ''}</td>
              <td>{d.etaMinutes}</td>
              <td>{d.location}</td>
              <td>
                {d.order ? (
                  <div>
                    <div>ID: {d.order.id}</div>
                    <div>Total: Rs. {d.order.total}</div>
                    <div>
                      Items:
                      <ul>
                        {d.order.items.map(it => <li key={it.productId || it.name}>{it.name} x {it.qty}</li>)}
                      </ul>
                    </div>
                  </div>
                ) : '—'}
              </td>
              <td>
                {d.order && d.order.customer ? (
                  <div>
                    <div>{d.order.customer.name}</div>
                    <div>{d.order.customer.contact}</div>
                    <div>{d.order.customer.address}</div>
                  </div>
                ) : '—'}
              </td>
            </tr>
          ))}
          {deliveries.length === 0 && <tr><td colSpan="7">No deliveries assigned</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
