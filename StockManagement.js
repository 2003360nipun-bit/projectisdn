import React, { useEffect, useState } from "react";

const PROVINCES = ["Central Province","Western Province","Southern Province"];

export default function StockManagement() {
  const [province, setProvince] = useState(PROVINCES[0]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`/api/reports/stock/${encodeURIComponent(province)}`)
      .then(r => r.json())
      .then(setRows)
      .catch(err => console.error(err));
  }, [province]);

  function downloadCSV() {
    window.open(`/api/reports/stock/${encodeURIComponent(province)}?csv=true`, '_blank');
  }

  return (
    <div>
      <h3>Stock Management</h3>
      <div style={{marginBottom:12}}>
        <label>Province</label>
        <select value={province} onChange={e => setProvince(e.target.value)}>
          {PROVINCES.map(p => <option key={p}>{p}</option>)}
        </select>
        <button onClick={downloadCSV} style={{marginLeft:8}}>Download CSV</button>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Low Threshold</th><th>Low</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.category}</td>
              <td>Rs. {r.price}</td>
              <td>{r.stock}</td>
              <td>{r.lowThreshold}</td>
              <td>{r.low}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan="7">No products</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
