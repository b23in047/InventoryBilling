import React, { useState } from "react";
import axios from "axios";

function AddProduct({ setRefresh }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    // 🚨 validation
    if (!product.name || !product.price || !product.quantity) {
      alert("Please fill all required fields");
      return;
    }

    const formattedProduct = {
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity),
      category: product.category
    };

    console.log(formattedProduct);

    await axios.post(
      "http://127.0.0.1:5000/api/products",
      formattedProduct
    );

    alert("Product Added Successfully");

    setRefresh(prev => !prev);

    // ✅ clear form after submit
    setProduct({
      name: "",
      price: "",
      quantity: "",
      category: ""
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Error: " + (error.response?.data?.message || error.message));
  }
};

  return (
  <div style={{ textAlign: "center", marginBottom: "30px" }}>
    <h2>➕ Add Product</h2>

    <input name="name" value={product.name} placeholder="Name" onChange={handleChange} />
    <input name="price" value={product.price} type="number" placeholder="Price" onChange={handleChange} />
    <input name="quantity" value={product.quantity} type="number" placeholder="Quantity" onChange={handleChange} />
    <input name="category" value={product.category} placeholder="Category" onChange={handleChange} />

    <br />

    <button onClick={handleSubmit}>Add Product</button>
  </div>
);
}

export default AddProduct;