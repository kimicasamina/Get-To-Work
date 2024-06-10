import express from "express";
const router = express.Router();
import taskModel from "../models/task-model.js";
import {
  getTasks,
  addTask,
  getTasksById,
  updateTask,
  addSubtask,
  insertSubtask,
  deleteTask,
} from "../controller/task-controller.js";

router.get("/", getTasks);
router.get("/:id", getTasksById);
router.post("/add", addTask);
router.put("/:id/updatetask", updateTask);
router.delete("/:id/deletetask", deleteTask);
router.put("/:id/addsubtask", addSubtask);
router.put("/:id/insertsubtask", insertSubtask);
export default router;
