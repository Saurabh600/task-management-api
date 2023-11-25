import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  getOneTask,
  taskAnalytics,
  updateTask,
} from "../controllers/task";

import { authChecker } from "../helpers/auth";

const router = Router();

// adding auth middleware
router.use(authChecker);

router.get("/one", getOneTask);
router.get("/all", getAllTasks);
router.put("/", updateTask);
router.post("/new", createNewTask);
router.delete("/", deleteTask);

router.get("/analytics", taskAnalytics);

export default router;
