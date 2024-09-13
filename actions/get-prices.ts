import axios from "axios";

export async function getPrices() {
  try {
    const response = await axios("/api/prices");
    return response.data;
  } catch (error) {
    console.error("Error fetching prices");
  }
}
