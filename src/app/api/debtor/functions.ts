import axios from "axios";

export async function getDebtors() {
  try {
    const response = await axios.get("/api/debtor");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
