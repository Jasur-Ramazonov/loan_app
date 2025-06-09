import axios from "axios";

export async function getUsers() {
  try {
    const response = await axios.get("/api/user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
