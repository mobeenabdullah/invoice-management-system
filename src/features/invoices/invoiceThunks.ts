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

export const createInvoice = async (data: any, token: string) => {
  const url = "http://localhost:3139/invoices";
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getSingleInvoice = async (token: string, id: string) => {
  const url = `http://localhost:3139/invoices/${id}`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
};

export const updateInvoice = async (data: any, token: string) => {
  const url = "http://localhost:3139/invoices";
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};