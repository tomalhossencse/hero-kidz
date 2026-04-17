import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
      {[...Array(9)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default loading;
