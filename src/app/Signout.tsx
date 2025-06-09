"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="px-3 py-0.5 rounded-md bg-blue-600 text-white"
    >
      Signout
    </button>
  );
};

export default Signout;
