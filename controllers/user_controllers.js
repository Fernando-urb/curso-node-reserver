import { response, request } from "express";
import Usuario from "../models/usuario.js"
import bcryptjs from "bcryptjs"



export const usuarioGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total, usuarios
  });
};

export const usuarioPut = async (req, res = response) => {


  const { id } = req.params;
  const cleanId = id.trim();
  const { _id, password, google, correo, ...resto } = req.body;

  // T O D O validar contra base de daots
  if (password) {
    // encryptar contraseña 
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);

  }

  const usuario = await Usuario.findByIdAndUpdate(cleanId, resto);

  res.json(usuario);
};

export const usuarioPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  if (!correo) {
    return res.status(400).json({ error: "El campo 'correo' es obligatorio" });
  }

  // Validar si el correo ya existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({ error: "El correo ya está registrado" });
  }

  // Crear usuario
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.status(200).json({ usuario });
};


export const usuarioDelete = async (req, res = response) => {

  const { id } = req.params;


  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.usuario

  res.json({

    usuario , usuarioAutenticado,
  });
}
export const usuarioPatch = (req, res = response) => {
  res.json({
    msg: "patch API- controller"
  });
}    
