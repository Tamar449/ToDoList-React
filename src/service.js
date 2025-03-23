
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;

axios.interceptors.response.use(
  response => response,
  err => {
    console.error("Error caught by interceptor:", err);
    return Promise.reject(err);
  }
);

export default {
  getTasks: async () => {
    return await axios.get(`/`);
  },

  addTask: async (name) => {
    console.log('addTask', name)
    return await axios.post(`/?name=${name}`);
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    return await axios.put(`/${id}?IsComplete=${isComplete}`);
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    return await axios.delete(`/${id}`);
  }
};

