import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (person) => {
  return axios.post(baseUrl, person);
};

const update = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person);
};

const remove = (id, person) => {
  return axios.delete(`${baseUrl}/${id}}`)
}

const exportDefault = {
  getAll,
  create,
  update,
  remove
}

export default exportDefault;
