# API REST - Node.js + MongoDB

API REST para gestión de usuarios con autenticación y validaciones.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs para encriptación
- express-validator para validaciones

## Endpoints

### Usuarios
- `GET /api/users` - Obtener usuarios (con paginación)
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## Variables de Entorno
```
PORT=8030
MONGODB_ATLAS=tu_conexion_mongodb
```

## Instalación Local
```bash
npm install
npm start
```

## Despliegue en Vercel
1. Conecta tu repositorio de GitHub
2. Configura la variable de entorno MONGODB_ATLAS
3. Despliega automáticamente

