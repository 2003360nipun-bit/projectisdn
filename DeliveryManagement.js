import React, { useEffect, useState } from "react";

const PROVINCES = ["Central Province","Western Province","Southern Province"];

export default function DeliveryManagement() {
  const [province, setProvince] = useState(PROVINCES[0]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`/api/reports/deliveries/${encodeURIComponent(province)}`)
      .then(r => r.json())
      .then(setRows)
      .catch(err => console.error(err));
  }, [province]);

  function downloadCSV() {
    window.open(`/api/reports/deliveries/${encodeURIComponent(province)}?csv=true`, '_blank');
  }

  return (
    <div>
      <h3>Delivery Management</h3>
      <div style={{marginBottom:12}}>
        <label>Province</label>
        <select value={province} onChange={e => setProvince(e.target.value)}>
          {PROVINCES.map(p => <option key={p}>{p}</option>)}
        </select>
        <button onClick={downloadCSV} style={{marginLeft:8}}>Download CSV</button>
      </div>

      <table className="table">
        <thead><tr><th>Delivery ID</th><th>Order ID</th><th>Order Total</th><th>Driver</th><th>Assigned At</th><th>ETA (mins)</th><th>Status</th><th>Customer</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.deliveryId}>
              <td>{r.deliveryId}</td>
              <td>{r.orderId}</td>
              <td>Rs. {r.orderTotal}</td>
              <td>{r.driverName}</td>
              <td>{new Date(r.assignedAt).toLocaleString()}</td>
              <td>{r.etaMinutes}</td>
              <td>{r.status}</td>
              <td>{r.customerName} / {r.customerContact}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan="8">No deliveries</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
