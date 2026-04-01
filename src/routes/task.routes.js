import { Router } from "express";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/task.controller.js";
import { validateCreateTask, validateDeleteTask, validateUpdateTask } from "../middlewares/validator.js";

const router = Router();

router.get("/", getTask);
router.post("/createTask",validateCreateTask, createTask);
router.put("/updateTask/:id",validateUpdateTask,updateTask)
router.delete("/deleteTask/:id",validateDeleteTask,deleteTask)

export default router;
