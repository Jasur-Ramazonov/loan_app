"use client";
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-black text-white">
      <div className="w-[400px] h-[300px] border rounded-md p-2">
        <p className="w-full text-center text-2xl">Sign Up</p>
        <div className="h-[80%] flex justify-center items-center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("name", name);
              console.log("password", password);
              try {
                const res = await axios.post("/api/auth/signup", {
                  name,
                  password,
                });
                console.log(res);
              } catch (error) {
                console.log(error);
              }
              setName("");
              setPassword("");
              redirect("/api/auth/signin");
            }}
            className="w-full flex flex-col gap-5"
          >
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="p-2 rounded-md bg-white w-full text-black"
              placeholder="Name..."
            />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 rounded-md bg-white w-full text-black"
              placeholder="Password..."
            />
            <button className="w-full rounded-md bg-blue-600 cursor-pointer text-white py-2">
              Sign Up
            </button>
          </form>
          <p>
            If you have an account <Link href={"/api/auth/signin"}>signin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
