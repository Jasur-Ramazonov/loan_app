import axios from "axios";

export async function getDebtors() {
  try {
    const response = await axios.get("/api/debtor");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addDebtor(
  userId: string,
  name: string,
  totalDebt: number,
  phone?: string
) {
  try {
    const res = await axios.post("/api/debtor", {
      userId,
      name,
      totalDebt,
      phone,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDebtor(debtorId: string) {
  try {
    const res = await axios.delete("/api/debtor", { data: { debtorId } });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
