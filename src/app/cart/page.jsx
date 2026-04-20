import { getCart } from "@/actions/server/cart";
import Cart from "@/components/Cart/Cart";
import Container from "@/components/layouts/Container";
import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();

  return (
    <Container>
      <div>
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
      </div>

      <Cart cartItems={cartItems} />
    </Container>
  );
};

export default CartPage;
