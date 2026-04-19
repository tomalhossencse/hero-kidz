"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

const CartButton = ({ product }) => {
  //   console.log(product);
  const router = useRouter();
  const path = usePathname();
  const session = useSession();
  // console.log(session);
  const handle2Cart = () => {
    if (session.status === "authenticated") {
      alert(product._id);
    } else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };
  return (
    <button onClick={handle2Cart} className="btn btn-primary flex-1 gap-2">
      <FiShoppingCart />
      Add to Cart
    </button>
  );
};

export default CartButton;
