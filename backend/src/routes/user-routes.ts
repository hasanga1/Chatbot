import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", userSignup);
userRoutes.post("/login", userLogin);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.get("/auth-status", verifyToken, verifyUser);

export default userRoutes;