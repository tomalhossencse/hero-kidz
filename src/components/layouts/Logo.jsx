import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex items-center jus gap-1" href="/">
      <Image
        alt="hero-kidz-logo"
        src="/assets/logo.png"
        width={50}
        height={40}
      />
      <h2 className="text-xl font-bold">
        Hero <span className="text-primary">Kidz</span>
      </h2>
    </Link>
  );
};

export default Logo;
