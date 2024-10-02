import axios from "axios";

export async function deleteCombo(comboId: string) {
  try {
    const response = await axios.delete(`/api/combos?id=${comboId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting combo.", error);
    throw error;
  }
}
