"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthButtons = () => {
  const session = useSession();
  //   console.log(session);
  const image = session?.data?.user?.image;
  //   console.log(image);
  return (
    <div>
      {session.status === "authenticated" ? (
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full ring-2 ring-primary p-0.5 hover:scale-105 transition"
            alt="profile-img"
            src={image || "https://i.ibb.co.com/N2sNzs9J/images.png"}
            width={50}
            height={50}
          />
          <button
            onClick={() => signOut()}
            className="btn btn-primary btn-outline"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="btn btn-primary btn-outline">
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
