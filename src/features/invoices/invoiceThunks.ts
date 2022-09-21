import axios from "axios";
export const getInvoices = async (token: string, filters: any) => {
  const url = "http://localhost:3139/invoices/";
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: filters
  });
  return response;
};
