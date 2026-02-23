import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("isdn_users") || "[]");
    const me = users.find(u => u.email === user.email);
    setProfile(me);
  }, [user]);

  function updateField(k, v) {
    setProfile(prev => ({ ...prev, [k]: v }));
  }

  function save() {
    const users = JSON.parse(localStorage.getItem("isdn_users") || "[]");
    const idx = users.findIndex(u => u.email === profile.email);
    if (idx !== -1) {
      users[idx] = profile;
      localStorage.setItem("isdn_users", JSON.stringify(users));
      alert("Profile updated");
    }
  }

  if (!profile) return null;

  return (
    <div>
      <h3>Profile</h3>
      <div style={{background:"#fff", padding:12, borderRadius:8}}>
        <label>Name</label>
        <input value={profile.name} onChange={e => updateField("name", e.target.value)} />
        <label>Address</label>
        <input value={profile.address} onChange={e => updateField("address", e.target.value)} />
        <label>Contact</label>
        <input value={profile.contact} onChange={e => updateField("contact", e.target.value)} />
        <label>Province</label>
        <input value={profile.province} onChange={e => updateField("province", e.target.value)} />
        <label>Email</label>
        <input value={profile.email} disabled />
        <button onClick={save}>Save Profile</button>
      </div>
    </div>
  );
}
