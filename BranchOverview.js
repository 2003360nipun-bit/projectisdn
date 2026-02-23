import React, { useEffect, useState } from "react";

export default function BranchOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/reports/branches')
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Branch Overview</h3>
      <table className="table">
        <thead>
          <tr><th>Province</th><th>Weekly Sales</th><th>Monthly Sales</th><th>Weekly Orders</th><th>Monthly Orders</th><th>Total Orders</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.province || 'unknown'}>
              <td>{row.province || 'Unknown'}</td>
              <td>Rs. {row.weeklySales || 0}</td>
              <td>Rs. {row.monthlySales || 0}</td>
              <td>{row.weeklyOrders || 0}</td>
              <td>{row.monthlyOrders || 0}</td>
              <td>{row.totalOrders || 0}</td>
            </tr>
          ))}
          {data.length === 0 && <tr><td colSpan="6">No data</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
