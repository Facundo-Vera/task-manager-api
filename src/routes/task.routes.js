import { Router } from "express";
import { createTask, getTask, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.get("/", getTask);
router.post("/createTask", createTask);
router.put("/updateTask/:id",updateTask)

export default router;
