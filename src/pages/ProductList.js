import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetchProducts();
}, [refresh]);

  const fetchProducts = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/products");
    setProducts(res.data);
  };

  // 🗑️ Delete Product
  const deleteProduct = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/products/${id}`);
    fetchProducts(); // refresh list
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        📦 Product List
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#ffffff",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transition: "0.3s",
              position: "relative",
            }}
          >
            {/* Delete Button */}
            <button
              onClick={() => deleteProduct(p._id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#e74c3c",
                border: "none",
                color: "white",
                borderRadius: "5px",
                padding: "5px 8px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>

            <h3 style={{ color: "#27ae60", marginBottom: "10px" }}>
              {p.name}
            </h3>

            <p style={{ margin: "5px 0" }}>
              <b>💰 Price:</b> ₹{p.price}
            </p>

            <p style={{ margin: "5px 0" }}>
              <b>📦 Stock:</b>{" "}
              <span style={{ color: p.quantity < 10 ? "red" : "green" }}>
                {p.quantity}
              </span>
            </p>

            <p style={{ color: "#888", fontSize: "14px" }}>
              🏷️ {p.category || "General"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;