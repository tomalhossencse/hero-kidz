import { banglaFont } from "@/app/layout";
import Image from "next/image";
import React from "react";
import Container from "../layouts/Container";

const Banner = () => {
  return (
    <Container className="flex flex-col-reverse md:flex-row  justify-between items-center px-6">
      <div className={`flex-1 space-y-5 md:py-20  ${banglaFont.className}`}>
        <h2 className="md:text-6xl text-5xl font-bold md:leading-20 leading-18">
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
    </Container>
  );
};

export default Banner;
