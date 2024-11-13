import { Router } from "express";
import { createUser } from "../controllers/userController";
const router :Router = Router()
router.route("/api/idf/register").post(createUser);
router.route("/api/idf/login");

export default router