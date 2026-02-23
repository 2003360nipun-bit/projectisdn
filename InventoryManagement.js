import React, { useEffect, useState } from "react";

function toCSV(rows) {
  const header = Object.keys(rows[0] || {}).join(",");
  const lines = rows.map(r => Object.values(r).map(v => `"${String(v).replace(/"/g,'""')}"`).join(","));
  return [header, ...lines].join("\n");
}

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("isdn_products") || "[]"));
  }, []);

  function exportCSV() {
    if (!products.length) { alert("No data"); return; }
    const csv = toCSV(products.map(p => ({ id:p.id, name:p.name, category:p.category, stock:p.stock || 0, lowThreshold:p.lowThreshold || 10 })));
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const lowStock = products.filter(p => (p.stock || 0) <= (p.lowThreshold || 10));

  return (
    <div>
      <h3>Inventory</h3>
      <div style={{display:"flex", gap:12, marginBottom:12}}>
        <div className="card">Total SKUs: {products.length}</div>
        <div className="card">Low stock: {lowStock.length}</div>
        <div className="card"><button onClick={exportCSV}>Download CSV</button></div>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Stock</th><th>Low Threshold</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.stock || 0}</td>
              <td>{p.lowThreshold || 10}</td>
            </tr>
          ))}
          {products.length === 0 && <tr><td colSpan="5">No products</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
