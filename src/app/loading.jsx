import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-5xl font-bold">
      <p>HERO</p>
      <span className="animate-spin">🧿</span>
      <p className="text-primary">KIDZ...</p>
    </div>
  );
};

export default loading;
