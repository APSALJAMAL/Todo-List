import Todo from './tdl.model.js';
import { extractUserIdFromToken } from '../utils/verifyUser.js';



// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);
    const { title, description, priority, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority,
      dueDate,
      userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(error.message.includes('Unauthorized') ? 401 : 400).json({ message: error.message });
  }
};

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);

    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(error.message.includes('Unauthorized') ? 401 : 500).json({ message: error.message });
  }
};

// Get a specific todo by ID
export const getTodoById = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);

    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== userId) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(error.message.includes('Unauthorized') ? 401 : 500).json({ message: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);

    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== userId) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    Object.assign(todo, req.body);
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(error.message.includes('Unauthorized') ? 401 : 500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);

    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== userId) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.deleteOne();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(error.message.includes('Unauthorized') ? 401 : 500).json({ message: error.message });
  }
};
