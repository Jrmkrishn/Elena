import { Router } from "express";
import {
  createProject,
  deleteProject,
  updatedProjectDetails,
} from "../controllers/project.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/createproject").post(verifyJWT, createProject);
router.route("/updateproject").post(verifyJWT, updatedProjectDetails);
router.route("/deleteproject").post(verifyJWT, deleteProject);

export default router;
