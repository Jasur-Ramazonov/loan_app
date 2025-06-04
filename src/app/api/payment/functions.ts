import axios from "axios";

export async function getPayments() {
  try {
    const res = await axios.get("/api/payment");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
