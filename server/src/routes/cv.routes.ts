import { Router } from "express";
import { createCV, getCVs } from "../controllers/cv.controller";

const router = Router();

router.post("/", createCV);
router.get("/", getCVs);

export default router;
