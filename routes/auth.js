import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.js"
import validarCampos from "../middlewares/validar_campos.js"


const router = Router();

//get = leer informacion
router.post("/login",[

    check("correo","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validarCampos
],
    
    login);


export default router;

