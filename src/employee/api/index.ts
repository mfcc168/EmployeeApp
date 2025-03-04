import axios from "axios";
// import Constants from 'expo-constants';
// const API_URL = Constants.expoConfig?.extra?.API_URL;
const API_URL = 'https://mfcc.pythonanywhere.com/api/';

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
