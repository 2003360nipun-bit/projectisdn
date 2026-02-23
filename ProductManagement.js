import React, { useEffect, useState } from "react";

function ProductForm({ onSave, initial }) {
  const [form, setForm] = useState(initial || { name:"", category:"", price:0, image:"", stock:0, lowThreshold:10 });

  useEffect(() => setForm(initial || { name:"", category:"", price:0, image:"", stock:0, lowThreshold:10 }), [initial]);

  function update(k, v) { setForm(prev => ({...prev, [k]: v})); }

  function submit(e) {
    e.preventDefault();
    if (!form.name) { alert("Name required"); return; }
    onSave(form);
    setForm({ name:"", category:"", price:0, image:"", stock:0, lowThreshold:10 });
  }

  return (
    <form onSubmit={submit} style={{background:"#fff", padding:12, borderRadius:8, marginBottom:12}}>
      <label>Product Name</label>
      <input value={form.name} onChange={e => update("name", e.target.value)} required />
      <label>Category</label>
      <input value={form.category} onChange={e => update("category", e.target.value)} />
      <label>Price</label>
      <input type="number" value={form.price} onChange={e => update("price", parseFloat(e.target.value || 0))} />
      <label>Image URL</label>
      <input value={form.image} onChange={e => update("image", e.target.value)} />
      <label>Stock</label>
      <input type="number" value={form.stock} onChange={e => update("stock", parseInt(e.target.value || 0))} />
      <label>Low Stock Threshold</label>
      <input type="number" value={form.lowThreshold} onChange={e => update("lowThreshold", parseInt(e.target.value || 10))} />
      <div style={{display:"flex", gap:8, marginTop:8}}>
        <button type="submit">Save Product</button>
      </div>
    </form>
  );
}

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("isdn_products") || "[]"));
  }, []);

  function persist(list) {
    setProducts(list);
    localStorage.setItem("isdn_products", JSON.stringify(list));
  }

  function handleSave(data) {
    if (data.id) {
      const updated = products.map(p => p.id === data.id ? data : p);
      persist(updated);
      setEditing(null);
    } else {
      const newP = { ...data, id: "p_" + Date.now() };
      persist([...products, newP]);
    }
  }

  function handleDelete(id) {
    if (!window.confirm("Delete product?")) return;
    persist(products.filter(p => p.id !== id));
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h3>Product Management</h3>

      <ProductForm onSave={handleSave} initial={editing} />

      <div style={{marginBottom:12}}>
        <input placeholder="Search by name or category" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <table className="table">
        <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td><img src={p.image || "https://via.placeholder.com/60"} alt="" style={{width:60,height:40,objectFit:"cover"}}/></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>Rs. {p.price}</td>
              <td>{p.stock || 0}</td>
              <td>
                <button onClick={() => setEditing(p)}>Edit</button>
                <button className="secondary" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan="6">No products found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
