import express from "express";
import cors from "cors";
import userRoutes from "../routes/user_routes.js";
import authRoutes from "../routes/auth.js";
import dbConnection from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.users = "/api/users";
    this.auth = "/api/auth";

    //conectar a base de datos

    this.conectarDb();

    //middelewares
    this.middelewares();

    //rutas de mi aplicacion
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middelewares() {
    //cors
    this.app.use(cors());

    //lectura y parceo del body

    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    // Ruta de prueba para verificar que el servidor funciona
    this.app.get('/', (req, res) => {
      res.json({
        msg: 'API funcionando correctamente',
        endpoints: {
          users: '/api/users',
          auth: '/api/auth'
        }
      });
    });


    this.app.use(this.users, userRoutes);
    this.app.use(this.auth, authRoutes);
  }









  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto ", this.port);
    });
  }
}

export default Server;
