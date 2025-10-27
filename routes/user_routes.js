
import {Router} from "express";
import { usuarioDelete, usuarioGet , usuarioPatch, usuarioPut , usuarioPost} from "../controllers/user_controllers.js";

const router = Router();

  //get = leer informacion
    router.get("/", usuarioGet );
    //put = actualizar informacion
    router.put("/:id", usuarioPut);
    // post = crear informacion
    router.post("/", usuarioPost);
    //delete = borrar informacion
    router.delete("/", usuarioDelete);
      //patch = actualizar informacion parcialmente
    router.patch("/", usuarioPatch);




export default router;