"use client";

import { useMemo, useState } from "react";
import CartItem from "./CartItem";
import OrderSummery from "./OrderSummery";

const Cart = ({ cartItems = [] }) => {
  const [items, setItems] = useState(cartItems);

  const removeItem = (id) => {
    setItems(items.filter((i) => i._id != id));
  };
  const updateQuantity = (_id, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item._id == _id ? { ...item, quantity } : item)),
    );
  };
  return (
    <div>
      <p className="py-3">
        <span className="text-primary font-bold">{items.length}</span> Items
        Found in the Cart
      </p>
      <div className="flex">
        <div className=" flex-3 p-4 space-y-4">
          {items.map((item) => (
            <CartItem
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              item={{ ...item, _id: item._id.toString() }}
              key={item._id}
            />
          ))}
        </div>
        <div className="flex-1 p-4">
          <OrderSummery items={items} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
