"use client";

import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SocialButtons from "./SocialButtons";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const params = useSearchParams();

  const callback = params.get("callbackUrl") || "/";
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await postUser(formData);
      if (!result?.acknowledged)
        return Swal.fire("error", "Something Went Wrong", "error");

      if (result?.acknowledged) {
        // router.push("/login");
        // console.log(result);
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl: callback,
        });
        if (result.ok) {
          Swal.fire("success", "Welcome to Hero Kidz!", "success");
          router.push(callback);
        } else {
          Swal.fire("error", "Email or Password not Match!", "error");
        }
      }
      //   console.log(formData);

      // 👉 API call here
      // await fetch("/api/register", {...})
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Google login handler (demo)
  const handleGoogleLogin = () => {
    alert("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-sm text-white/70 mb-6">
          Join Hero Kidz today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-white/70">OR</div>

        {/* Google Login */}
        <SocialButtons />

        {/* Toggle */}
        <p className="text-center text-sm mt-6 text-white/70">
          Already have an account?{" "}
          <Link
            href={`/login?callbackUrl=${callback}`}
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
