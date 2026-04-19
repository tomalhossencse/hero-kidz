import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/Cart/CartItem";
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
        <p className="py-3">
          <span className="text-primary font-bold">{cartItems.length}</span>{" "}
          Items Found in the Cart
        </p>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.map((item) => (
          <CartItem
            item={{ ...item, _id: item._id.toString() }}
            key={item._id}
          />
        ))}
      </div>
    </Container>
  );
};

export default CartPage;
