import { Router } from "express";
import { createNewUser } from "../controllers/user";
import { authController } from "../controllers/auth";

const router = Router();

router.post("/new", createNewUser);
router.post("/auth", authController);

export default router;
