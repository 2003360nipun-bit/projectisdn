import React, { useEffect, useState } from "react";

export default function Products({ province = "" }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // load products from localStorage
    const p = JSON.parse(localStorage.getItem("isdn_products") || "[]");

    // If products have stockByProvince map, attach stock for the current province
    const normalized = p.map(prod => {
      // support both stockByProvince (object) or stock field
      const stockByProvince = prod.stockByProvince || prod.stock_by_province || {};
      const stock = (stockByProvince && stockByProvince[province]) ?? prod.stock ?? null;
      return { ...prod, stock };
    });

    setProducts(normalized);
  }, [province]);

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  function addToMainCart(product, qty = 1) {
    const cart = JSON.parse(localStorage.getItem("isdn_cart") || "[]");
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    localStorage.setItem("isdn_cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  const filtered = products.filter(p => {
    const matchesQuery = query ? p.name.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesCat = category ? p.category === category : true;
    return matchesQuery && matchesCat;
  });

  return (
    <div>
      <h3>Products {province ? `— ${province}` : ""}</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Search by name"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
        {filtered.map(p => (
          <div className="product-card" key={p.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
            <img src={p.image || "https://via.placeholder.com/160"} alt={p.name} style={{ width: "100%", height: 120, objectFit: "cover" }} />
            <h4 style={{ margin: "8px 0" }}>{p.name}</h4>
            <div style={{ color: "#666" }}>{p.category}</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>Rs. {p.price}</div>
            <div style={{ color: "#444", marginTop: 6 }}>Stock: {p.stock !== null ? p.stock : "N/A"}</div>
            <button style={{ marginTop: 8 }} onClick={() => addToMainCart(p, 1)}>Add to Cart</button>
          </div>
        ))}
        {filtered.length === 0 && <div>No products available.</div>}
      </div>
    </div>
  );
}
