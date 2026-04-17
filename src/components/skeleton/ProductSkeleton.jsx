const ProductSkeleton = () => {
  return (
    <div className="bg-base-100 w-100 shadow-xl rounded-2xl overflow-hidden animate-pulse">
      {/* Image */}
      <figure className="relative h-56 w-full overflow-hidden">
        <div className="w-full h-full bg-base-300" />

        {/* Fake Discount Badge */}
        <div className="absolute top-3 left-3 h-5 w-12 bg-base-300 rounded-full" />
      </figure>

      {/* Content */}
      <div className="card-body p-4 space-y-2">
        {/* Title */}
        <div className="h-5 bg-base-300 rounded w-3/4" />
        <div className="h-5 bg-base-300 rounded w-1/2" />

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-base-300 rounded w-16" />
          <div className="h-4 bg-base-300 rounded w-20" />
        </div>

        {/* Price + Sold */}
        <div className="flex justify-between items-center">
          {/* Price */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-base-300 rounded w-20" />
            <div className="h-4 bg-base-300 rounded w-12" />
          </div>

          {/* Sold */}
          <div className="h-4 bg-base-300 rounded w-14" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <div className="h-10 bg-base-300 rounded-lg w-full" />
          <div className="h-10 bg-base-300 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
