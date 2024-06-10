import express from "express";
const router = express.Router();
import {
  getTimeById,
  getTime,
  deleteTime,
  updateTimeById,
  createTime,
  getToday,
} from "../controller/time-controller.js";

router.get("/", getTime);
router.get("/:id/today", getToday);
router.get("/:id", getTimeById);
router.post("/create", createTime);
router.delete("/:id/delete", deleteTime);
router.put("/:id/update", updateTimeById);

export default router;
