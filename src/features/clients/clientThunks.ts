import axios from "axios";
import { GraphQLClient, gql } from 'graphql-request'

export const getClients = async (token: string, filters: any) => {
  const url = "http://localhost:3139/clients";
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: filters
  });
  return response;
};

export const getClientsName = async (token: string) => {
  const url = "http://localhost:3139/clients/names";
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


export const graphqlGetClients = async (token: string, sortOrder: string = 'asc', sortBy: string = 'creation', limit: string = '10', offset: string = '0' ) => {
  const endpoint = 'http://localhost:3139/graphql';
 
  const graphQLClient = new GraphQLClient(endpoint, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  })

  const query = gql`
  {
    clients(sort: {${sortBy} : ${sortOrder}}, limit: ${limit}, offset: ${offset}) {
      results {id name email invoicesCount totalBilled companyDetails {name}} total
    }
  }
  `;

 return await graphQLClient.request(query)
}