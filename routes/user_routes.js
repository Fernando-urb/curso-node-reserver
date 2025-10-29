import { Router } from "express";
import {
  usuarioDelete,
  usuarioGet,
  usuarioPatch,
  usuarioPut,
  usuarioPost,
} from "../controllers/user_controllers.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar_campos.js";
import {
  esRoleValido,
  emailExiste,
  existeUserID,
} from "../helpers/db_validators.js";
import mongoose from "mongoose";

const router = Router();

//get = leer informacion
router.get("/", usuarioGet);




//put = actualizar informacion
router.put(
  "/:id",
  [
    check("id")
      .customSanitizer((id) => id.trim()) // elimina \n y espacios
      .custom((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("no es un ID valido");
        }
        return true;
      }),
    check("id").custom(existeUserID),
    check("rol").custom(esRoleValido),

    validarCampos,
  ],
  usuarioPut
);





// post = crear informacion
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El valor ingresado no corresponde a un correo").isEmail(),
    check("correo").custom(emailExiste),

    check("password", "el passward debe contener mas de 6 letras").isLength({
      min: 6,
    }),
    // check("rol","no es un rol permitido").isIn(["ADMIN_ROLE" ,"USER_ROEL"]),
    check("rol").custom(esRoleValido),

    validarCampos,
  ],
  usuarioPost
);




//delete = borrar informacion
router.delete("/:id", [
  check("id")
      .customSanitizer((id) => id.trim()) // elimina \n y espacios
      .custom((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("no es un ID valido");
        }
        return true;
      }),
    check("id").custom(existeUserID),
    
  validarCampos,
  usuarioDelete,
]);
//patch = actualizar informacion parcialmente
router.patch("/", usuarioPatch);

export default router;
