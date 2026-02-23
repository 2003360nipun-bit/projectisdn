import React, { useEffect, useState } from "react";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("isdn_users") || "[]");
    setCustomers(users.filter(u => u.role === "customer"));
  }, []);

  function persist(list) {
    const all = JSON.parse(localStorage.getItem("isdn_users") || "[]");
    const others = all.filter(u => u.role !== "customer");
    const merged = [...others, ...list];
    localStorage.setItem("isdn_users", JSON.stringify(merged));
    setCustomers(list);
  }

  function saveCustomer(updated) {
    const list = customers.map(c => c.id === updated.id ? updated : c);
    persist(list);
    setEditing(null);
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.id || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h3>Customer Management</h3>

      <div style={{marginBottom:12}}>
        <input placeholder="Search by name or id" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Contact</th><th>Province</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.contact}</td>
              <td>{c.province}</td>
              <td><button onClick={() => setEditing(c)}>Edit</button></td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan="6">No customers</td></tr>}
        </tbody>
      </table>

      {editing && (
        <div style={{background:"#fff", padding:12, borderRadius:8, marginTop:12}}>
          <h4>Edit Customer</h4>
          <label>Name</label>
          <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
          <label>Contact</label>
          <input value={editing.contact} onChange={e => setEditing({...editing, contact: e.target.value})} />
          <label>Address</label>
          <input value={editing.address} onChange={e => setEditing({...editing, address: e.target.value})} />
          <label>Province</label>
          <select value={editing.province} onChange={e => setEditing({...editing, province: e.target.value})}>
            <option>Western Province</option>
            <option>Central Province</option>
            <option>Southern Province</option>
          </select>
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <button onClick={() => saveCustomer(editing)}>Save</button>
            <button className="secondary" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
