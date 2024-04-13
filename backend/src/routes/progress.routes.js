import { Router } from "express";
import { updateProgress } from "../controllers/progress.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();
router.route("/updateprogress").post(verifyJWT, updateProgress);

export default router;
