import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/order`, orderData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.details?.join(", ") ||
      error.response?.data?.error ||
      "Failed to send order. Please try again.";
    throw new Error(message);
  }
};
