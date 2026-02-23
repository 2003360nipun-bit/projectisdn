import React, { useEffect, useState } from "react";

export default function DriverProfile() {
  const [form, setForm] = useState({ name:'', nic:'', vehicleNumber:'', contact:'', email:'', address:'' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/drivers/me', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
      .then(r => r.json())
      .then(data => { setForm({ name: data.name || '', nic: data.nic || '', vehicleNumber: data.vehicleNumber || '', contact: data.contact || '', email: data.email || '', address: data.address || '' }); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  function updateField(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function save(e) {
    e.preventDefault();
    const payload = { ...form };
    // If password field present, include password
    fetch('/api/drivers/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(res => { alert('Profile updated'); })
      .catch(err => { console.error(err); alert('Update failed'); });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Driver Profile</h3>
      <form onSubmit={save} style={{maxWidth:600}}>
        <label>Name</label>
        <input value={form.name} onChange={e => updateField('name', e.target.value)} required />
        <label>NIC</label>
        <input value={form.nic} onChange={e => updateField('nic', e.target.value)} />
        <label>Vehicle Number</label>
        <input value={form.vehicleNumber} onChange={e => updateField('vehicleNumber', e.target.value)} />
        <label>Contact</label>
        <input value={form.contact} onChange={e => updateField('contact', e.target.value)} />
        <label>Email</label>
        <input value={form.email} onChange={e => updateField('email', e.target.value)} required />
        <label>Address</label>
        <input value={form.address} onChange={e => updateField('address', e.target.value)} />
        <label>New Password (leave blank to keep current)</label>
        <input type="password" onChange={e => updateField('password', e.target.value)} />
        <div style={{marginTop:12}}>
          <button type="submit">Save Profile</button>
        </div>
      </form>
    </div>
  );
}
