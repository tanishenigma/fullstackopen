import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/persons`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/api/persons`, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/api/persons/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/api/persons/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
