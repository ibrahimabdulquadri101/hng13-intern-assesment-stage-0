import { Router } from "express";
import { Profile } from "../controller/profile.controller.js";
export const profileRouter = Router();
profileRouter.get("/me", Profile);
