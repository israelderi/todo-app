import express from "express";
import {getTasks, createTask, updateTask, deleteTask} from '../controllers/Task.js'

const router = express.Router();

router.get('/tasks/:id', getTasks);
router.post('/create/:id', createTask);
router.put('/update/:id', updateTask)
router.delete('/delete/:id/:userid', deleteTask);

export default router;