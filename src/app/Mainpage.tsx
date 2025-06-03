"use client";
import React, { useEffect, useState } from "react";
import { getDebtors } from "./api/debtor/functions";
import { Debtor } from "./utils/defination";
import { getUsers } from "./api/user/functions";
import { User } from "@/generated/prisma";

const Mainpage = (params: { name: string }) => {
  const [debtors, setDebtors] = useState<Debtor[]>();
  const [id, setId] = useState("");
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  useEffect(() => {
    getUsers().then((res: User[]) => {
      const currentUser = res.find((itm) => itm.name === params.name);
      setId(currentUser!.id);
    });
  }, []);

  useEffect(() => {
    if (id) {
      getDebtors().then((res) => {
        if (!res) return new Error();
        setDebtors(res.filter((itm: any) => itm.userId === id));
      });
    }
  }, [id]);

  return (
    <div className="w-2/3 h-full p-10">
      <p className="text-5xl">Bosh sahifa</p>
      <div className="flex gap-10 mt-5">
        <div className="w-[300px] h-[150px] border-2 border-[#eef1f0] rounded-lg p-5 flex flex-col gap-2">
          <p className="text-2xl font-semibold">Qarzdorlar</p>
          <p className="text-3xl font-semibold">
            {debtors ? debtors.length : 0}
          </p>
        </div>
        <div className="w-[300px] h-[150px] border-2 border-[#eef1f0] rounded-lg p-5 flex flex-col gap-2">
          <p className="text-2xl font-semibold">Bugungi qarzlar</p>
          <p className="text-3xl font-semibold">
            {debtors
              ? debtors
                  .filter(
                    (itm) =>
                      Number(itm.createdAt.slice(0, 4)) === year &&
                      Number(itm.createdAt.slice(5, 7)) === month &&
                      Number(itm.createdAt.slice(8, 10)) === day
                  )
                  .map((itm) => {
                    return itm.totalDebt;
                  })
                  .reduce((val, acc) => val + acc, 0)
              : 0}
          </p>
        </div>
        <div className="w-[300px] h-[150px] border-2 border-[#eef1f0] rounded-lg p-5 flex flex-col gap-2">
          <p className="text-2xl font-semibold">Umumiy qarzlar</p>
          <p className="text-3xl font-semibold">
            {debtors
              ? debtors
                  .map((itm) => {
                    return itm.totalDebt;
                  })
                  .reduce((val, acc) => val + acc, 0)
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
