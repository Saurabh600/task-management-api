import { Router } from "express";
import { createNewUser } from "../controllers/user";

const router = Router();

router.post("/new", createNewUser);

export default router;
