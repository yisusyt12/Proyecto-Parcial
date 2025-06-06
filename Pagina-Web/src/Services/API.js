import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export async function fetchData(endpoint) {
  try {
    const response = await api.get(endpoint);
    console.log("Datos obtenidos:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error; 
  }
}


export async function postData(endpoint, data) {
  try {
    const response = await api.post(endpoint, data);
    console.log("Datos enviados:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    throw error; 
  }
}




export async function fetchData2(endpoint) {
  try {
    const response = await api2.get(endpoint);
    console.log("Datos obtenidos:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error; 
  }
}


export async function postData2(endpoint, data) {
  try {
    const response = await api2.post(endpoint, data);
    console.log("Datos enviados:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    throw error; 
  }
}


export default api;