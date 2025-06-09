import axios from "axios";

export async function updateDebtor(id: string, totalDebt: number) {
  try {
    const res = await axios.put(`/api/debtor/${id}`, { totalDebt });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
