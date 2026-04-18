import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {
  const { title, image, price, discount, ratings, reviews, sold, _id } =
    product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
      {/* Image */}
      <figure className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
            -{discount}%
          </span>
        )}
      </figure>

      {/* Content */}
      <div className="card-body p-4 space-y-2">
        {/* Title */}
        <h2 className="font-semibold text-lg line-clamp-2">{title}</h2>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-gray-700 font-medium">{ratings}</span>
          </div>
          <span>({reviews} reviews)</span>
        </div>
        <div className="flex justify-between items-center">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ৳{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm line-through text-gray-400">
                ৳{price}
              </span>
            )}
          </div>

          {/* Sold */}
          <div className="text-md text-secondary">{sold} sold</div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          {/* Add to Cart */}
          <CartButton product={product} />

          {/* View Details */}
          <Link
            href={`/products/${_id}`}
            className="btn btn-outline flex-1 gap-2"
          >
            <MdOutlineVisibility />
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
