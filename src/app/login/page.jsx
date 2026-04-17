"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
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
      // await fetch("/api/login", {...})

      alert("Login successful (demo)");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Google login handler
  const handleGoogleLogin = () => {
    alert("Google login clicked");
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
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center text-sm mt-6 text-white/70">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
