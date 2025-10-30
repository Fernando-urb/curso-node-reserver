import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Usuario from './models/usuario.js';

dotenv.config();

const activarUsuario = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS);
    console.log('Conectado a MongoDB');

    // Activar el usuario específico
    const resultado = await Usuario.updateOne(
      { correo: 'ufer1@gmail.com' },
      { estado: true }
    );

    console.log('Usuario actualizado:', resultado);

    // Verificar el cambio
    const usuario = await Usuario.findOne({ correo: 'ufer1@gmail.com' });
    console.log('Estado del usuario:', usuario.estado);

    await mongoose.connection.close();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error:', error.message);
  }
};

activarUsuario();