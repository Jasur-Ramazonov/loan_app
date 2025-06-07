"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { IoSearch } from "react-icons/io5";
import { Drawer } from "vaul";
import { Debtor, Payment } from "../utils/defination";
import { addDebtor, deleteDebtor, getDebtors } from "../api/debtor/functions";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import {
  addPayment,
  deletePayments,
  getPayments,
} from "../api/payment/functions";

const Debtors = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [currentDebtor, setCurrentDebtor] = useState<Debtor | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [debtorsPay, setDebtorsPay] = useState<{ [key: string]: number }>({});
  const [payment, setPayment] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalDebt, setTotalDebt] = useState<number | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && payments[0]) {
      getDebtors().then((res) => {
        const myDebtors: Debtor[] = res.filter(
          (itm: Debtor) => itm.userId === session?.user.id
        );
        setDebtors(myDebtors);
        myDebtors.forEach((debtor) => {
          const id = debtor.id;
          const payed = payments
            .filter((itm) => itm.debtorId === debtor.id)
            .map((itm) => itm.amount)
            .reduce((val, acc) => val + acc, 0);
          debtorsPay[id] = payed;
          console.log(debtorsPay);

          setDebtorsPay({ ...debtorsPay });
        });
      });
    }
  }, [status, payments]);

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
              const isPayed = debtor.totalDebt - debtorsPay[debtor.id];
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
                      <span className="text-red-600">
                        {isPayed ? (
                          isPayed / 1000 + " " + "000 so'm"
                        ) : (
                          <p className="text-green-600">To'langan</p>
                        )}
                      </span>
                    </div>
                  </div>
                  {isPayed ? (
                    <div className="flex items-center gap-2">
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
                      <button
                        onClick={() => {
                          setOpen3(true);
                          setCurrentDebtor(debtor);
                        }}
                        className="px-2 py-1 rounded-md border border-[#b0b2b6] cursor-pointer"
                      >
                        To'lov
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        deletePayments(debtor.id).then(() => {
                          deleteDebtor(debtor.id).then(() => {
                            getPayments().then(setPayments);
                            getDebtors().then((res) => {
                              const myDebtors: Debtor[] = res.filter(
                                (itm: Debtor) => itm.userId === session?.user.id
                              );
                              setDebtors(myDebtors);
                            });
                          });
                        });
                      }}
                      className="px-2 py-1 rounded-md border border-[#b0b2b6] cursor-pointer"
                    >
                      O'chirish
                    </button>
                  )}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("name", name);
                console.log("totalDebt", totalDebt);
                if (!name || !totalDebt) return;
                const userId = session?.user.id!;
                addDebtor(userId, name, totalDebt, phone).then(() => {
                  getPayments().then(setPayments);
                  getDebtors().then((res) => {
                    const myDebtors: Debtor[] = res.filter(
                      (itm: Debtor) => itm.userId === session?.user.id
                    );
                    setDebtors(myDebtors);
                  });
                  setName("");
                  setPhone("");
                  setTotalDebt(null);
                  setOpen1(false);
                });
              }}
              className="h-fit text-black flex justify-start items-center flex-col gap-5 p-6"
            >
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="ism"
                className="p-2 rounded-md text-black outline-[#b0b2b6] border border-[#b0b2b6] focus:bg-gray-200 w-1/2"
              />
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="text"
                placeholder="telefon raqam (xohishiy)"
                className="p-2 rounded-md text-black outline-[#b0b2b6] border border-[#b0b2b6] focus:bg-gray-200 w-1/2"
              />
              <input
                onChange={(e) => {
                  setTotalDebt(Number(e.target.value));
                }}
                value={String(totalDebt)}
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
                {payments
                  .filter((pay) => pay.debtorId === currentDebtor?.id)
                  .map((pay) => pay.amount)
                  .reduce((val, acc) => val + acc, 0)
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
      {/* modal to payment */}
      <Drawer.Root open={open3} onOpenChange={setOpen3}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
            <Drawer.Title className="text-center mt-5 font-semibold text-2xl">
              To'lov qilish
            </Drawer.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!payment || payment <= 0) return;
                const shouldPay =
                  currentDebtor?.totalDebt! - debtorsPay[currentDebtor!.id];
                if (shouldPay >= payment) {
                  addPayment(currentDebtor!.id, payment).then(() => {
                    setCurrentDebtor(null);
                    setPayment(null);
                    setOpen3(false);
                    getPayments().then(setPayments);
                    getDebtors().then((res) => {
                      const myDebtors: Debtor[] = res.filter(
                        (itm: Debtor) => itm.userId === session?.user.id
                      );
                      setDebtors(myDebtors);
                    });
                  });
                }
              }}
              className="h-fit flex w-full justify-center items-center p-5 mb-45 flex-col gap-2"
            >
              <input
                onChange={(e) => {
                  setPayment(Number(e.target.value));
                }}
                value={String(payment)}
                type="number"
                placeholder="to'lov miqdori"
                className="p-2 rounded-md text-black outline-[#b0b2b6] border border-[#b0b2b6] focus:bg-gray-200 w-1/2"
              />
              <button
                type={"submit"}
                className="px-2 py-1.5 rounded-md bg-blue-600 cursor-pointer text-white w-1/2"
              >
                To'lov qilish
              </button>
              <button
                onClick={() => {
                  console.log(currentDebtor);
                }}
                className="px-2 py-1.5 rounded-md bg-green-600 cursor-pointer text-white w-1/2"
              >
                Qarzni yopish
              </button>
            </form>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Debtors;
