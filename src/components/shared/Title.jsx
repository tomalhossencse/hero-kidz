import React from "react";

const Title = ({ first, second }) => {
  return (
    <h2 className="text-center text-4xl font-bold my-10">
      {first} <span className="text-primary">{second}</span>
    </h2>
  );
};

export default Title;
