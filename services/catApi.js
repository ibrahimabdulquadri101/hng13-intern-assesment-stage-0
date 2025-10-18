import axios from "axios";
export const connectToCatApi = async () => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 60000,
    }); //timeout is in ms
    console.log(response.data.fact);
    return response.data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    throw new Error("External Cat API connection failed or timed out.");
  }
};
