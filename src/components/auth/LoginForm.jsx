"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import SocialButtons from "./SocialButtons";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const params = useSearchParams();

  const callback = params.get("callbackUrl") || "/";

  const router = useRouter();
  const [formData, setFormData] = useState({
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
      console.log(formData);

      // 👉 API call here
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        // redirect: false,
        callbackUrl: params.get("callbackUrl") || "/",
      });

      if (!result.ok) {
        Swal.fire("error", "Email or Password not Match!", "error");
      } else {
        Swal.fire("success", "Welcome to Hero Kidz!", "success");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>
        <p className="text-center text-sm text-white/70 mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Extra options */}
          <div className="flex justify-between items-center text-sm text-white/70">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-xs" />
              Remember me
            </label>

            <Link href="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-white/70">OR</div>

        {/* Google Login */}
        <SocialButtons />

        {/* Toggle */}
        <p className="text-center text-sm mt-6 text-white/70">
          Don’t have an account?{" "}
          <Link
            href={`/register?callbackUrl=${callback}`}
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
