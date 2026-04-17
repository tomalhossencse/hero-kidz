import Link from "next/link";
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const Error404 = () => {
  return (
    <div className="flex gap-4 flex-col min-h-screen justify-center items-center">
      <BiSolidErrorAlt size={120} className="text-primary" />
      <h2 className="text-5xl font-bold">Page no Found</h2>
      <Link href="/" className="btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Error404;
