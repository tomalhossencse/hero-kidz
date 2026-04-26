import { getAllOrders } from "@/actions/server/order";
import Image from "next/image";
import Link from "next/link";

const OrdersPage = async () => {
  const orders = await getAllOrders();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-gray-500 text-sm">{orders.length} orders found</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No Orders Yet 😔</p>
          <p className="text-sm mt-2">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            );

            return (
              <div
                key={order._id}
                className="bg-base-100 border rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* 🧾 Top Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-medium">{order._id}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Order Date</p>
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <span className="badge badge-success px-3 py-2">
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* 📦 Items */}
                <div className="p-4 space-y-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      {/* Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          ৳{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Show more indicator */}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-400">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>

                {/* 💰 Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4 border-t">
                  {/* Total */}
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold text-primary">৳{total}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/my-orders/${order._id}`}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View Details
                    </Link>

                    <button className="btn btn-sm btn-primary">
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
