import { Router } from "express";
import { createUser, getAllLaunchedRockets, getToken, loginUser } from "../controllers/userController";
import { createAttack, getMissile } from "../controllers/attackController";
const router :Router = Router()
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/getAllLaunchedRockets").get(getAllLaunchedRockets)
router.route("/getUserByToken").get(getToken)
router.route("/getMissileDetails").get(getMissile)
router.route("/createAttack").post(createAttack)
export default router