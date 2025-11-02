import { Router } from "express";
import validarJWT from "../middlewares/validar_jwt.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar_campos.js";
import {
  creaCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db_validators.js";
import { esAdminRol , tieneRole} from "../middlewares/validar_roles.js";

const router = Router();

//obtener todas las categorias -publico

router.get("/", obtenerCategorias);

//obtener una categoria por id -publico
router.get(
  "/:id",
  [
    check("id", "no es id valido de mongo").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

//crear categoria -privado-cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  creaCategoria
);
//actualizar registro por id -privado con un token valido
router.put("/:id",[
    validarJWT,
    check('id', 'No es un ID válido de Mongo').isMongoId(),
     check("nombre","el nombre es obligatorio").not().isEmpty(),
     check("id").custom(existeCategoriaPorId),
     validarCampos
] ,
    actualizarCategoria);
//borrar una categoria -admin
router.delete("/:id", [
      validarJWT,
    esAdminRol,
  
     check('id', 'No es un ID válido de Mongo').isMongoId(),
      check("id").custom(existeCategoriaPorId),
      validarCampos
    
],
    borrarCategoria);

export default router;
