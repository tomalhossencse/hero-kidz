import { getCart } from "@/actions/server/cart";
import Checkout from "@/components/home/Checkout";
import Container from "@/components/layouts/Container";
import React from "react";

const CheckoutPage = async () => {
  const cartItems = await getCart();
  return (
    <Container>
      <div>
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Checkout
        </h2>
      </div>
      <Checkout cartItems={cartItems} />
    </Container>
  );
};

export default CheckoutPage;
