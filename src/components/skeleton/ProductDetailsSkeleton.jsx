import Container from "../layouts/Container";

const ProductDetailsSkeleton = () => {
  return (
    <Container className="w-6xl px-4 py-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg bg-base-300">
          {/* Fake Discount Badge */}
          <div className="absolute top-4 left-4 h-6 w-16 bg-base-200 rounded-full" />
        </div>

        {/* Info */}
        <div className="space-y-5">
          {/* Title */}
          <div className="h-8 bg-base-300 rounded w-3/4" />

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="h-4 w-16 bg-base-300 rounded" />
            <div className="h-4 w-20 bg-base-300 rounded" />
            <div className="h-4 w-16 bg-base-300 rounded" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-28 bg-base-300 rounded" />
            <div className="h-6 w-20 bg-base-300 rounded" />
          </div>

          {/* Button */}
          <div className="h-12 w-full md:w-40 bg-base-300 rounded-lg" />
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 space-y-3">
        <div className="h-4 bg-base-300 rounded w-full" />
        <div className="h-4 bg-base-300 rounded w-11/12" />
        <div className="h-4 bg-base-300 rounded w-10/12" />
        <div className="h-4 bg-base-300 rounded w-9/12" />
      </div>

      {/* Q&A Section */}
      <div className="mt-12 space-y-4">
        {/* Title */}
        <div className="h-6 w-40 bg-base-300 rounded" />

        {/* Q&A items */}
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border bg-base-100 shadow-sm space-y-2"
          >
            <div className="h-4 w-3/4 bg-base-300 rounded" />
            <div className="h-4 w-2/3 bg-base-300 rounded" />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProductDetailsSkeleton;
