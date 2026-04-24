"use client";

import {
  decreaseItemCart,
  deleteItemsCart,
  increaseItemCart,
} from "@/actions/server/cart";
import { p } from "framer-motion/client";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, updateQuantity }) => {
  const { _id, title, image, price, quantity } = item;
  const [loading, setLoading] = useState(false);

  const handleIncrease = async () => {
    setLoading(true);
    const result = await increaseItemCart(_id);
    console.log(result);
    if (result.success) {
      updateQuantity(_id, quantity + 1);
    }
    setLoading(false);
  };

  const handleDecrease = async () => {
    setLoading(true);
    const result = await decreaseItemCart(_id);
    console.log(result);
    if (result.success) {
      updateQuantity(_id, quantity - 1);
    }
    setLoading(false);
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await deleteItemsCart(_id);
          if (result.success) {
            removeItem(_id);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              position: "top-right",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              title: "Opps..",
              text: "Something went wrong!",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-base-100/80 backdrop-blur-md border border-base-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="96px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1">
        <h2 className="font-semibold text-base md:text-lg line-clamp-1">
          {title}
        </h2>
        <p className="text-primary font-bold text-lg">৳{price}</p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full">
        <button
          onClick={() => handleDecrease(_id)}
          disabled={quantity <= 1 || loading}
          className="btn btn-xs btn-circle btn-ghost hover:bg-base-300 disabled:opacity-40"
        >
          <FaMinus size={10} />
        </button>

        <span className="w-6 text-center font-semibold text-sm">
          {item.quantity}
        </span>

        <button
          disabled={loading}
          onClick={handleIncrease}
          className="btn btn-xs btn-circle btn-ghost hover:bg-base-300"
        >
          <FaPlus size={10} />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-[80px]">
        <p className="text-sm text-gray-500">Total</p>
        <p className="font-bold text-lg text-secondary">৳{price * quantity}</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => handleRemove()}
        className="btn btn-sm btn-circle btn-ghost text-error hover:bg-red-100 transition"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default CartItem;
