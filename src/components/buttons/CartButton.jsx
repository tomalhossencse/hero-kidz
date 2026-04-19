"use client";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  //   console.log(product);
  const router = useRouter();
  const path = usePathname();
  const session = useSession();
  // console.log(session);
  const handle2Cart = async () => {
    setLoading(true);
    try {
      if (session.status === "authenticated") {
        const result = await handleCart({ product, inc: true });
        if (result.success) {
          Swal.fire({
            title: "Add to Cart",
            text: product?.title,
            icon: "success",
            position: "top-right",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something Went Wrong",
            icon: "error",
            position: "top-right",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        router.push(`/login?callbackUrl=${path}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={session.status === "loading" || loading}
      onClick={handle2Cart}
      className="btn btn-primary flex-1 gap-2"
    >
      <FiShoppingCart />
      Add to Cart
    </button>
  );
};

export default CartButton;
