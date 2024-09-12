import axios from "axios";

export async function createPrices(
  prices: { title: string; zone: string; price: number }[]
) {
  try {
    const response = await axios.post("/api/prices", { prices });
    return response.status === 201;
  } catch (error) {
    console.error("Error uploading prices:", error);
    return false;
  }
}
