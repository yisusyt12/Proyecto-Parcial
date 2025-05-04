import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", 
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ", 
  },
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


const api2 = axios.create({
  baseURL: "http://127.0.0.1:8000", 
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ", 
  },
});

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