import axios from "axios";

const API_URL = "http://localhost:3000";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to send order");
  }
};
