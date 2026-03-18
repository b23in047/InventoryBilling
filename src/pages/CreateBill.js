import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateBill() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/products");
    setProducts(res.data);
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;
  const finalTotal = subtotal + gst - discount;

  const saveBill = async () => {
    await axios.post("http://127.0.0.1:5000/api/bills", {
      customerName: "Customer",
      items: cart,
      discount,
    });

    alert("Bill Saved Successfully");
    setCart([]);
    setDiscount(0);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        🧾 Billing System
      </h2>

      {/* PRODUCTS */}
      <div style={{ marginBottom: "20px" }}>
        <h3>🛒 Products</h3>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#f9f9f9",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "8px",
            }}
          >
            <span>
              {p.name} - ₹{p.price}
            </span>
            <button onClick={() => addToCart(p)}>Add</button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div style={{ marginBottom: "20px" }}>
        <h3>🧺 Cart</h3>

        {cart.length === 0 && <p>No items added</p>}

        {cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <span>
              {item.name} - ₹{item.price}
            </span>

            <div>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                -
              </button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item._id)}
              style={{ background: "#e74c3c" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* BILL SUMMARY */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>💳 Bill Summary</h3>

        <p><b>Subtotal:</b> ₹{subtotal.toFixed(2)}</p>
        <p><b>GST (18%):</b> ₹{gst.toFixed(2)}</p>

        <input
          placeholder="Enter Discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

        <h2 style={{ color: "#27ae60" }}>
          Total: ₹{finalTotal.toFixed(2)}
        </h2>

        <button onClick={saveBill} style={{ width: "100%" }}>
          💾 Save Bill
        </button>
      </div>
    </div>
  );
}

export default CreateBill;