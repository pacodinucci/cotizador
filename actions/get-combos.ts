import axios from "axios";

export async function getCombos(comboId?: string) {
  try {
    const url = comboId ? `/api/combos?id=${comboId}` : "/api/combos";

    const response = await axios(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching combos.", error);
    throw error;
  }
}
