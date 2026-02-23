import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PROVINCES = [
  "All Provinces",
  "Central Province",
  "Western Province"
 
];

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState(PROVINCES[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await login(email.trim(), password, province);
    setLoading(false);
    if (!res.ok) {
      alert("Login failed: " + (res.message || "Invalid credentials"));
    }
    // on success AuthContext already navigates to the correct dashboard
  }

  return (
    <div>
      <h1 className="title">IslandLink Sales Distribution Network (ISDN)</h1>

      <div className="auth-card">
        <h2>ISDN Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <label>Province</label>
          <select value={province} onChange={(e) => setProvince(e.target.value)}>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <div style={{ marginTop: 10 }}>
          <Link to="/register">Register new account</Link>
        </div>
      </div>
    </div>
  );
}
