import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from './api.js';
import { Button, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify'; // Import Toastify

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'low' });

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  // Add a new todo
  const handleAddTodo = async () => {
    try {
      const addedTodo = await createTodo(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodo({ title: '', description: '', priority: 'low' });
      toast.success('Todo added successfully!'); // Success toast
    } catch (error) {
      console.error('Error adding todo:', error.message);
      toast.error('Failed to add todo'); // Error toast
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully!'); // Success toast
    } catch (error) {
      console.error('Error deleting todo:', error.message);
      toast.error('Failed to delete todo'); // Error toast
    }
  };

  // Toggle todo completion
  const handleUpdateTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const updatedTodo = await updateTodo(id, {
        ...todoToUpdate,
        priority: todoToUpdate.priority === 'low' ? 'high' : 'low', // Example update
      });
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      toast.success('Todo priority updated successfully!'); // Success toast
    } catch (error) {
      console.error('Error updating todo:', error.message);
      toast.error('Failed to update todo'); // Error toast
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-12">
      <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg shadow-gray-700 bg-white dark:bg-gray-800 dark:shadow-purple-500 dark:shadow-2xl">
  <h1 className="text-3xl font-bold mb-6 text-center text-purple-600 dark:text-purple-400">Todo List</h1>

  {/* Add Todo Form */}
  <div className="mb-6">
    <div className="mb-6">
      <Label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</Label>
      <TextInput
        id="title"
        type="text"
        name="title"
        placeholder="Enter todo title"
        value={newTodo.title}
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <Label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
      <TextInput
        id="description"
        type="text"
        name="description"
        placeholder="Enter todo description"
        value={newTodo.description}
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</Label>
      <select
        id="priority"
        name="priority"
        value={newTodo.priority}
        onChange={handleChange}
        className="w-full p-3 mb-4  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-purple-400"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <Button
      onClick={handleAddTodo}
      className="w-full p-2  bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300 dark:bg-purple-500 dark:hover:bg-purple-600"
    >
      Add Todo
    </Button>
  </div>
</div>


      {/* Todo List - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12 pt-12">
  {todos.map((todo) => (
    <div
      key={todo._id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-gray-700 shadow-lg p-4 flex flex-col space-y-4 transform transition duration-300 hover:scale-105 hover:shadow-xl dark:shadow-purple-500 dark:shadow-2xl"
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">{todo.title}</h2>
        <p className="text-sm font-semibold">{todo.description}</p>
        <p className="text-base text-gray-900 dark:text-gray-300">Priority: {todo.priority}</p>
      </div>
      <div className="flex justify-center space-x-4 items-center mt-4">
        <Button
          onClick={() => handleUpdateTodo(todo._id)}
          className="dark:bg-green-500 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Toggle Priority
        </Button>
        <Button
          onClick={() => handleDeleteTodo(todo._id)}
          className="dark:bg-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 duration-300"
        >
          Delete
        </Button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default TodoList;
