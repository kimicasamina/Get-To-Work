import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  getProfile,
  getProjects,
  getTime,
} from "../controller/user-controller.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/getprofile", verifyToken, getProfile);
router.get("/:id/getprojects", getProjects);
router.get("/:id/gettime", getTime);

// router.get("/getuser", verifyToken, getUser);

export default router;
