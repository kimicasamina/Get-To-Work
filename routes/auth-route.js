import express from "express";
const router = express.Router();
import { verifyGoogle } from "../controller/auth-controller.js";

router.post("/google", verifyGoogle);

export default router;
