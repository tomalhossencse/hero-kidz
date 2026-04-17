import { getSingleProducts } from "@/actions/server/products";
import Container from "@/components/layouts/Container";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProducts(id);
  const {
    title,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    qna,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <Container className="px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image src={image} alt={title} fill className="object-cover" />

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow">
              -{discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          {/* Title */}
          <h1 className="text-3xl font-bold">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="font-medium text-gray-700">{ratings}</span>
            </div>
            <span className="text-gray-500">({reviews} reviews)</span>
            <span className="text-secondary">{sold} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              ৳{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="line-through text-gray-400 text-lg">
                ৳{price}
              </span>
            )}
          </div>

          {/* Button */}
          <button className="btn btn-primary gap-2 w-full md:w-auto">
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        {/* Description */}
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Q&A Section */}
      {qna?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Product Q&A</h2>

          <div className="space-y-4">
            {qna.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border bg-base-100 shadow-sm"
              >
                <p className="font-medium">❓ {item.question}</p>
                <p className="text-gray-600 mt-1">✅ {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
