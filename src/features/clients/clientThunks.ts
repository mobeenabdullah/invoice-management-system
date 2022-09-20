import axios from "axios";
export const getClients = async (token: string) => {
  const url = "http://localhost:3139/clients";
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createClient = async (data: any, token: string) => {
  const url = "http://localhost:3139/clients";
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateClient = async (data: any, token: string) => {
  const url = "http://localhost:3139/clients";
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getSingleClient = async (clientId: string, token: string) => {
  const url = `http://localhost:3139/clients/${clientId}`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
