import { banglaFont } from "@/app/layout";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between items-center">
      <div className={`flex-1 space-y-5 py-20  ${banglaFont.className}`}>
        <h2 className="text-6xl font-bold leading-20">
          আপনার শিশুকে দিন একটি{" "}
          <span className="text-primary">উজ্জ্বল ভবিষ্যৎ</span>
        </h2>
        <p className="text-2xl">Buy Every Toy up to 20% Discount</p>

        <button className="btn btn-primary">Explore Products</button>
      </div>
      <div className="flex-1">
        <Image
          alt="banner"
          src="https://i.ibb.co.com/d442XJ2X/hero.png"
          width={500}
          height={400}
        ></Image>
      </div>
    </div>
  );
};

export default Banner;
