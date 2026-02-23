import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("isdn_cart") || "[]"));
  }, []);

  function updateQty(id, qty) {
    const c = cart.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item);
    setCart(c);
    localStorage.setItem("isdn_cart", JSON.stringify(c));
  }

  function removeItem(id) {
    const c = cart.filter(i => i.id !== id);
    setCart(c);
    localStorage.setItem("isdn_cart", JSON.stringify(c));
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function placeOrder() {
    if (!cart.length) { alert("Cart is empty"); return; }
    // create order
    const orders = JSON.parse(localStorage.getItem("isdn_orders") || "[]");
    const order = {
      id: "o_" + Date.now(),
      items: cart,
      total,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    orders.push(order);
    localStorage.setItem("isdn_orders", JSON.stringify(orders));
    // clear cart
    localStorage.removeItem("isdn_cart");
    alert("Order placed. Redirecting to payments.");
    navigate("/customer/payments", { state: { orderId: order.id } });
  }

  return (
    <div>
      <h3>My Cart</h3>
      <div className="cart-list">
        {cart.length === 0 && <div>Your cart is empty</div>}
        {cart.length > 0 && (
          <>
            <table className="table">
              <thead>
                <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>Rs. {item.price}</td>
                    <td>
                      <input type="number" value={item.qty} min="1" style={{width:70}} onChange={e => updateQty(item.id, parseInt(e.target.value || 1))} />
                    </td>
                    <td>Rs. {item.price * item.qty}</td>
                    <td><button className="secondary" onClick={() => removeItem(item.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{display:"flex", justifyContent:"space-between", marginTop:12}}>
              <div style={{fontWeight:700}}>Total: Rs. {total}</div>
              <div>
                <button onClick={placeOrder}>Checkout & Place Order</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
