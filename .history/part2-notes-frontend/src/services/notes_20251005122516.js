import axios from "axios";
const baseUrl = "";

const getAll = () => {
  const request = axios.get(`${baseUrl}`);
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
