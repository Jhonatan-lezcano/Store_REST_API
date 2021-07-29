import { Router } from "express";
const router = Router();
import { checkDuplicateUsernameEmail } from "../middlewares/index";

import { signIn, signUp } from "../controllers/auth.controller";

router.post("/signup", checkDuplicateUsernameEmail, signUp);
router.post("/signin", signIn);

export default router;
