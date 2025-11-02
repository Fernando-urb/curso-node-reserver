import { Router } from "express";
import validarJWT from "../middlewares/validar_jwt.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar_campos.js";
import {
  creaProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} from "../controllers/productos.js";
import {
  existeCategoriaPorId,
  existeProductoPorId,
} from "../helpers/db_validators.js";
import { esAdminRol } from "../middlewares/validar_roles.js";

const router = Router();

//obtener todas las categorias -publico

router.get("/", obtenerProductos);

//obtener una categoria por id -publico
router.get(
  "/:id",
  [
    check("id", "no es id valido de mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//crear categoria -privado-cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("categoria", "no es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  creaProducto
);
//actualizar registro por id -privado con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    // check("nombre", "el nombre es obligatorio").not().isEmpty(),
    //  check("categoria", "no es un id de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);
//borrar una categoria -admin
router.delete(
  "/:id",
  [
      validarJWT,
    esAdminRol,
  

    check("id", "No es un ID válido de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

export default router;
