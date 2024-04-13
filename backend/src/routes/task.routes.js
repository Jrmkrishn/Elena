import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTaskDetails,
} from "../controllers/task.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/createtask").post(verifyJWT, createTask);
router.route("/updatetask").post(verifyJWT, updateTaskDetails);
router.route("/deletetask").post(verifyJWT, deleteTask);

export default router;
