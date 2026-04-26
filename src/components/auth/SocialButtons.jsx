"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialButtons = () => {
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();

  // Google login handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", {
        // redirect: false,
        callbackUrl: params.get("callbackUrl") || "/",
      });
      // console.log(result);
      // if (result?.ok) {
      //   Swal.fire({
      //     position: "top-end",
      //     icon: "success",
      //     title: "Login with Google Succesfully",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // } else {
      //   Swal.fire({
      //     position: "top-end",
      //     icon: "error",
      //     title: "sorry Login Failed. Try Again",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
      >
        <FcGoogle size={20} />
        {loading ? " Continue with Google...." : " Continue with Google"}
      </button>
    </div>
  );
};

export default SocialButtons;
