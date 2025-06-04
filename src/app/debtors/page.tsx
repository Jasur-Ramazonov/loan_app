"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { IoSearch } from "react-icons/io5";
import { Drawer } from "vaul";
import { Debtor, Payment } from "../utils/defination";
import { getDebtors } from "../api/debtor/functions";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { getPayments } from "../api/payment/functions";

const Debtors = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [currentDebtor, setCurrentDebtor] = useState<Debtor | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const deBtorsMap = new Map();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!debtors) return;
    debtors.forEach((itm) => {
      deBtorsMap.set(itm.id, itm);
    });
  }, [debtors]);

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

  useEffect(() => {
    getPayments().then(setPayments);
  }, []);

  return (
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
          <button
            onClick={() => {
              setOpen1(true);
            }}
            className="px-2 py-1.5 text-white rounded-md bg-blue-500 cursor-pointer"
          >
            Yangi qarzdor qo'shish
          </button>
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
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => {
                        setOpen2(true);
                        setCurrentDebtor(debtor);
                        console.log("debtorId", debtor.id);
                      }}
                      className="px-2 py-1 rounded-md border border-[#b0b2b6] cursor-pointer"
                    >
                      Batafsil
                    </button>
                    <button className="px-2 py-1 rounded-md border border-[#b0b2b6] cursor-pointer">
                      To'lov
                    </button>
                  </div>
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
      {/* Modal to create new debtor */}
      <Drawer.Root open={open1} onOpenChange={setOpen1}>
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
      </Drawer.Root>
      {/* Modal to see information about debtor */}
      <Drawer.Root open={open2} onOpenChange={setOpen2}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
            <Drawer.Title className="text-2xl font-semibold text-center p-2">
              {currentDebtor?.name} haqida
            </Drawer.Title>
            <div className="h-[400px] flex flex-col gap-2">
              <span className=" text-xl flex justify-center gap-2">
                <p className="font-semibold">Olingan kun:</p>
                {currentDebtor?.createdAt.slice(
                  0,
                  currentDebtor?.createdAt.indexOf("T")
                )}
              </span>
              <span className=" text-xl flex justify-center gap-2">
                <p className=" font-semibold">Olingan vaqt:</p>
                {currentDebtor?.createdAt.slice(
                  currentDebtor?.createdAt.indexOf("T") + 1,
                  currentDebtor?.createdAt.indexOf("Z") - 4
                )}
              </span>
              <span className=" text-xl flex justify-center gap-2">
                <p className=" font-semibold">To'langan:</p>
                {payments[0]
                  ? payments
                      .filter((pay) => pay.debtorId === currentDebtor?.id)
                      .map((pay) => pay.amount)
                      .reduce((val, acc) => val + acc, 0) /
                      1000 +
                    " 000 so'm"
                  : "to'lov qilinmagan shu paytgacha"}
              </span>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Debtors;
