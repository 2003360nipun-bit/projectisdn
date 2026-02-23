import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", role: "customer", nic: "", address: "", contact: "", province: "", email: "", password: ""
  });

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res = register(form);
    if (res.ok) {
      alert("Register successful");
      navigate("/login");
    } else {
      alert("Register failed: " + res.message);
    }
  }

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={form.name} onChange={e => update("name", e.target.value)} required />
        <label>Role</label>
        <select value={form.role} onChange={e => update("role", e.target.value)}>
          <option value="customer">Customer</option>
          <option value="rdc_staff">RDC Staff</option>
          <option value="head_office">Head Office</option>
          <option value="driver">Driver</option>
        </select>
        <label>NIC No.</label>
        <input value={form.nic} onChange={e => update("nic", e.target.value)} required />
        <label>Address</label>
        <input value={form.address} onChange={e => update("address", e.target.value)} />
        <label>Contact No.</label>
        <input value={form.contact} onChange={e => update("contact", e.target.value)} />
        <label>Province</label>
        <select value={form.province} onChange={e => update("province", e.target.value)}>
          <option value="All Province">All Province</option>
          <option value="Central Province">Central Province</option>
          <option value="Western Province">Western Province</option>
          <option value="Southern Province">Southern Province </option>
        </select>
        <label>Email</label>
        <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required />
        <label>Password</label>
        <input type="password" value={form.password} onChange={e => update("password", e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
