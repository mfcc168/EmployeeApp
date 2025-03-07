import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL+"products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchInvoices = async () => {
  try {
    const response = await axios.get(API_URL+"invoices");
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(API_URL+"customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};
