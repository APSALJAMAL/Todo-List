import express from 'express';
import { 
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
} from './tdl.controller.js';
import {  verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

// Routes
router.get('/todo/', verifyToken, getTodos);
router.post('/todo/', verifyToken, createTodo);
router.get('/todo/:id', verifyToken, getTodoById);
router.put('/todo/:id', verifyToken, updateTodo);
router.delete('/todo/:id', verifyToken, deleteTodo);

export default router;
