import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { validateLoginUser, validateRegisterUser } from "../middlewares/validator.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/register",validateRegisterUser, register);
router.post("/login",validateLoginUser,login)

router.post("/logout" ,authenticate,logout)

export default router;
