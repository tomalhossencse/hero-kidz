import React from "react";
import Title from "../shared/Title";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "@/actions/server/products";
// import products from "@/data/toys.json";

const Products = async () => {
  const products = await getProducts();
  // console.log(products);
  return (
    <div>
      <Title first={"Our"} second={"Products"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
