import React, { useState } from "react";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import CreateBill from "./pages/CreateBill";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <AddProduct setRefresh={setRefresh} />
      <ProductList refresh={refresh} />
      <CreateBill />   {/* 👈 THIS MUST BE HERE */}
    </div>
  );
}

export default App;