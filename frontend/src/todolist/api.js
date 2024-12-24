import axios from 'axios';

// Axios instance with base URL
const api = axios.create({
  baseURL: '/api/todolist',
  withCredentials: true, // Include cookies in requests
});

// Get all todos
export const getTodos = async () => {
  const response = await api.get('/todo/');
  return response.data;
};

// Create a new todo
export const createTodo = async (todo) => {
  const response = await api.post('/todo/', todo);
  return response.data;
};

// Get a specific todo by ID
export const getTodoById = async (id) => {
  const response = await api.get(`/todo/${id}`);
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  const response = await api.put(`/todo/${id}`, updatedTodo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await api.delete(`/todo/${id}`);
  return response.data;
};

export default api;
