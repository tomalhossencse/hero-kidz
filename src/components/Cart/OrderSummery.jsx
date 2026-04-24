import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const OrderSummery = ({ items }) => {
  const totalItems = useMemo(
    () => items?.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items?.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  return (
    <div className="sticky top-20 bg-base-100 border border-base-300 rounded-2xl shadow-xl p-5 space-y-4">
      {/* Title */}
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="divider my-1"></div>

      {/* Product List */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3 bg-base-200/60 p-2 rounded-xl"
          >
            {/* Image */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                width={200}
                height={200}
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-sm">
              <p className="line-clamp-1 font-medium">{item.title}</p>
              <p className="text-gray-500">
                ৳{item.price} × {item.quantity}
              </p>
            </div>

            {/* Total */}
            <p className="font-semibold text-sm">
              ৳{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="divider my-1"></div>

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Items</span>
          <span className="font-medium">{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">৳{totalPrice}</span>
        </div>

        <div className="flex justify-between text-gray-500">
          <span>Delivery</span>
          <span>৳0</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-primary">৳{totalPrice}</span>
      </div>

      {/* Button */}
      <Link
        href="/checkout"
        disabled={!items.length}
        className="btn btn-primary w-full mt-3"
      >
        Confirm Order
      </Link>
    </div>
  );
};

export default OrderSummery;
