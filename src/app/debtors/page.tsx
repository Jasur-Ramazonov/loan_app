"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { IoSearch } from "react-icons/io5";
import { Drawer } from "vaul";
import { Debtor } from "../utils/defination";
import { getDebtors } from "../api/debtor/functions";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

const Debtors = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      getDebtors().then((res) => {
        const myDebtors = res.filter(
          (itm: Debtor) => itm.userId === session?.user.id
        );
        setDebtors(myDebtors);
      });
    }
  }, [status]);

  return (
    <Drawer.Root>
      <div className="w-full h-[100vh] bg-white text-black flex">
        <Sidebar />
        <div className="w-2/3 h-full p-10">
          <p className="text-3xl">Qarzdorlar</p>
          <div className="flex gap-2 mt-5">
            <div className="flex items-center gap-2 border-2 rounded-md border-[#f3f4f5] p-2">
              <IoSearch className="text-xl text-[#b0b2b6]" />
              <input
                type="text"
                placeholder="Qidiruv"
                className="outline-none"
                onClick={() => {
                  console.log("man inputman");
                }}
              />
            </div>
            <Drawer.Trigger className="px-2 py-1.5 text-white rounded-md bg-blue-500 cursor-pointer">
              Yangi qarzdor qo'shish
            </Drawer.Trigger>
          </div>
          {/* Cards */}
          <div className="mt-5 flex flex-col gap-2">
            {debtors[0] ? (
              debtors.map((debtor, i) => {
                return (
                  <div
                    key={i}
                    className="w-fit border border-[#b0b2b6] rounded-md p-2 flex items-center gap-5"
                  >
                    <div className="flex flex-col">
                      <p className="text-xl">{debtor.name}</p>
                      <div className="flex gap-5">
                        <p>
                          {debtor?.phone?.slice(0, 4) + " "}
                          {debtor.phone?.slice(4, 6) + " "}
                          {debtor.phone?.slice(6, 9) + " "}
                          {debtor.phone?.slice(9, 11) + " "}
                          {debtor.phone?.slice(11, 13) + " "}
                        </p>
                        <p className="text-red-600">
                          {debtor.totalDebt / 1000} 000 so'm
                        </p>
                      </div>
                    </div>
                    <button className="px-2 py-1 rounded-md border border-[#b0b2b6] cursor-pointer">
                      Batafsil
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col mt-5 gap-2">
                <Skeleton className="h-[80px] w-[300px]" />
                <Skeleton className="h-[80px] w-[300px]" />
                <Skeleton className="h-[80px] w-[300px]" />
                <Skeleton className="h-[80px] w-[300px]" />
              </div>
            )}
          </div>
        </div>
        {/* Modal */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
            <Drawer.Title>
              <p className="text-black text-2xl text-center p-2 mb-5">
                Yangi Qarzdor Qo'shish
              </p>
            </Drawer.Title>
            <form className="h-fit text-black flex justify-start items-center flex-col gap-5 p-6">
              <input
                type="text"
                placeholder="ism"
                className="p-2 rounded-md text-black outline-[#b0b2b6] border border-[#b0b2b6] focus:bg-gray-200 w-1/2"
              />
              <input
                type="text"
                placeholder="telefon raqam (xohishiy)"
                className="p-2 rounded-md text-black outline-[#b0b2b6] border border-[#b0b2b6] focus:bg-gray-200 w-1/2"
              />
              <input
                type="number"
                placeholder="qarz miqdori"
                className="p-2 rounded-md text-black outline-[#b0b2b6] border border-[#b0b2b6] focus:bg-gray-200 w-1/2"
              />
              <button className="px-2 py-1.5 rounded-md bg-blue-600 cursor-pointer text-white w-1/2">
                Qo'shish
              </button>
            </form>
          </Drawer.Content>
        </Drawer.Portal>
      </div>
    </Drawer.Root>
  );
};

export default Debtors;
