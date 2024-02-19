import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (person) => {
  return axios.post(baseUrl, person);
};

const update = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person)
    .catch (error => (
      console.log(`Error updating resource: ${error}`)
      
    ));
};

const remove = (id) => {
  return (axios.delete(`${baseUrl}/${id}`)
  .then (response => {
    console.log('Resource deleted sucessfully')
  })
  .catch (error => {
    console.error('Error deleting resource: ', error)
  })
  )
}

const exportDefault = {
  getAll,
  create,
  update,
  remove
}

export default exportDefault;
