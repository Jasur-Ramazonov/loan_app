"use client";
import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Signin = () => {
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  useEffect(() => {
    if (providers) console.log(providers);
  }, [providers]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-black text-white">
      <div className="border rounded-md w-[350px] h-fit p-2">
        <p className="text-center text-2xl">Sign in</p>

        {providers &&
          Object.values(providers).map((provider: any, i) => {
            if (provider.id === "credentials") {
              return (
                <form
                  key={i}
                  className="w-full flex flex-col gap-2 mt-5 mb-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const username = (
                      e.currentTarget.elements.namedItem(
                        "username"
                      ) as HTMLInputElement
                    ).value;
                    const password = (
                      e.currentTarget.elements.namedItem(
                        "password"
                      ) as HTMLInputElement
                    ).value;
                    console.log("username", username);
                    console.log("password", password);

                    signIn(provider.id, {
                      username,
                      password,
                      callbackUrl: "/",
                    });
                  }}
                >
                  <input
                    type="text"
                    name="username"
                    className="p-2 rounded-md text-black bg-white w-full"
                    placeholder="username"
                  />
                  <input
                    type="password"
                    name="password"
                    className="p-2 rounded-md text-black bg-white w-full"
                    placeholder="password"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md bg-blue-600 cursor-pointer"
                  >
                    Sign in with Username
                  </button>
                </form>
              );
            }
            return (
              <div
                key={i}
                className="w-full bg-gray-800 p-2 flex items-center justify-center cursor-pointer mb-2 mt-2 rounded-md"
              >
                <button
                  onClick={() => {
                    signIn(provider.id, { callbackUrl: "/" });
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  {provider.name === "GitHub" ? (
                    <FaGithub className="text-2xl" />
                  ) : (
                    <FcGoogle className="text-2xl" />
                  )}
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        <button
          onClick={() => {
            router.push("/signup");
          }}
          className="px-3 py-1.5 rounded-md bg-blue-600 cursor-pointer"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Signin;
