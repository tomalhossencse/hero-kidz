"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Checkout = ({ cartItems = [] }) => {
  const session = useSession();
  const router = useRouter();
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const payload = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        adress: form.address.value,
        payment: form.payment.value,
      };
      console.log(payload);
      const result = await createOrder(payload);

      console.log(result);
      if (result.insertedId) {
        router.push("/");
        Swal.fire({
          title: "Success",
          text: "Order Added",
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
    } catch (error) {
      console.log(error);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //   if (session?.status == "loading") {
  //     return <h2>Loading........</h2>;
  //   }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE (Form) */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300 space-y-6"
          >
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="label text-sm">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Md. Tomal Hossen"
                    value={session?.data?.user?.name}
                    // onChange={handleChange}
                    required
                    readOnly
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label text-sm">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={session?.data?.email}
                    // onChange={handleChange}
                    required
                    readOnly
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mt-4">
                <label className="label text-sm">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  //   value={formData.phone}
                  //   onChange={handleChange}
                  required
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>

              <textarea
                name="address"
                placeholder="House, Road, Area, District..."
                // value={formData.address}
                // onChange={handleChange}
                required
                className="textarea textarea-bordered w-full h-28 focus:textarea-primary"
              ></textarea>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="radio radio-primary"
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    disabled
                    className="radio"
                  />
                  <span>Online Payment (Coming Soon)</span>
                </label>
              </div>
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full text-lg mt-2">
              Place Order 🚀
            </button>
          </form>
        </div>

        {/* RIGHT SIDE (Order Summary) */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-base-100 border border-base-300 rounded-2xl shadow-xl p-5 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="divider my-1"></div>

            {/* Products */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 bg-base-200/60 p-2 rounded-xl"
                >
                  <Image
                    width={400}
                    height={300}
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div className="flex-1 text-sm">
                    <p className="line-clamp-1 font-medium">{item.title}</p>
                    <p className="text-gray-500">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-sm">
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="divider my-1"></div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{totalPrice}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span>৳0</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">৳{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
