"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Sidebar = () => {
  const params = usePathname();

  useEffect(() => {
    console.log(params);
  }, []);
  return (
    <aside className="w-1/3 bg-[#f6f7f7] h-full p-2 flex flex-col">
      <div
        onClick={() => {
          redirect("/");
        }}
        className={clsx({
          "text-2xl p-2 rounded-md cursor-pointer mt-5": true,
          "bg-[#e6e5e5]": params === "/",
        })}
      >
        Bosh sahifa
      </div>
      <div
        onClick={() => {
          redirect("/debtors");
        }}
        className={clsx({
          "text-2xl p-2 rounded-md cursor-pointer mt-5": true,
          "bg-[#e6e5e5]": params === "/debtors",
        })}
      >
        Qarzdorlar ro'yxati
      </div>
    </aside>
  );
};

export default Sidebar;
