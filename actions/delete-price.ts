import axios from "axios";

export async function deletePrice(id: string) {
  try {
    const response = await axios.delete(`/api/prices?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting price", error);
    throw error;
  }
}
