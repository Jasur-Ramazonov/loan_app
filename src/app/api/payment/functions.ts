import axios from "axios";

export async function getPayments() {
  try {
    const res = await axios.get("/api/payment");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addPayment(debtorId: string, amount: number) {
  try {
    const res = await axios.post("/api/payment", { debtorId, amount });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePayments(debtorId: string) {
  try {
    const res = await axios.delete("/api/payment", { data: { debtorId } });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
