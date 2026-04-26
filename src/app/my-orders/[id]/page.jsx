import { getSingleOrders } from "@/actions/server/order";
import Image from "next/image";

const OrderDetails = async ({ params }) => {
  const { id } = await params;
  const order = await getSingleOrders(id);

  const { items, name, email, phone, adress, payment, createdAt, totalPrice } =
    order;

  //   const totalPrice = items.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0,
  //   );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-gray-500 text-sm">
          Order placed on {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* 📦 Items */}
          <div className="bg-base-100 rounded-2xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5">Items in your order</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-xs text-gray-400">৳{item.price} each</p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 📍 Shipping Info */}
          <div className="bg-base-100 rounded-2xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> {name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {adress}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Sticky Summary) */}
        <div className="space-y-6">
          <div className="bg-base-100 rounded-2xl border shadow-md p-6 sticky top-24">
            {/* Status */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <span className="badge badge-success">Confirmed</span>
            </div>

            {/* Payment */}
            <p className="text-sm text-gray-500 mb-3">
              Payment:{" "}
              <span className="font-medium text-gray-700">{payment}</span>
            </p>

            {/* Divider */}
            <div className="divider my-2"></div>

            {/* Items Breakdown */}
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span className="line-clamp-1 w-2/3">{item.title}</span>
                  <span>৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ৳{totalPrice}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2">
              <button className="btn btn-primary w-full">
                Download Invoice
              </button>

              <button className="btn btn-outline w-full">Track Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
