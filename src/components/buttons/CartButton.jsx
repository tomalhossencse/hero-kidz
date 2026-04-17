"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

const CartButton = ({ product }) => {
  //   console.log(product);
  const router = useRouter();
  const path = usePathname();
  const handle2Cart = () => {
    const isLogin = false;
    if (isLogin) {
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
