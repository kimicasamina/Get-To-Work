import express from "express";
const router = express.Router();
import projectModel from "../models/project-model.js";
import verifyToken from "../middleware/verifyToken.js";
import {
  getProjects,
  getProjectById,
  getProjectsByUserId,
  getProjectTasks,
  createProject,
  updateProject,
  deleteProject,
  addTask,
  getSummary,
} from "../controller/project-controller.js";

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.get("/:id/getprojectsbyuserid", getProjectsByUserId);
router.get("/:id/gettasks", getProjectTasks);
router.put("/:id/update", updateProject);
router.post("/:id/addtask", addTask);
router.post("/create", createProject);
router.get("/:id/projectsummary", getSummary);
router.delete("/:id/delete", deleteProject);

export default router;
