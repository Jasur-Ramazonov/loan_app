import axios from "axios";
import { Jersey_15_Charted } from "next/font/google";
import { it } from "node:test";

export async function updateDebtor() {
  try {
    const res = await axios.put(`/api/debtor/`);
  } catch (error) {
    console.log(error);
  }
Jersey_15_Charted
23it    

