import express from "express";
import cors from "cors";
import router from "../routes/user_routes.js";


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //middelewares
    this.middelewares();
    
    this.users = "/api/users";

    //rutas de mi aplicacion
    this.routes();
  }

  middelewares() {

    //cors
    this.app.use(cors())

    //lectura y parceo del body

    this.app.use(express.json());


    //directorio publico
    this.app.use(express.static("public"))
  }

  routes() {

    this.app.use(this.users, router)
  
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto ", this.port);
    });
  }
}

export default Server;
