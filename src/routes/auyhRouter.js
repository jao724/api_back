import { Router } from "express";
import { 
register, 
login, 
logout, 
profile } from "../controlers/authControlers.js";
import { authRequire } from '../middelwares/validateToken.js'
import { validateSchema } from "../middelwares/validatorMiddelware.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";
const router = Router();


router.post('/register', validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout', logout);
router.get('/profile' , authRequire, profile);

export default router;