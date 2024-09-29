import axios from "axios";

export async function getPriceById(priceId: string) {
  try {
    const response = await axios(`/api/prices/${priceId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting price", error);
  }
}
