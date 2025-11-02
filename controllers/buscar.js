import { response } from "express";
import { Usuario ,Categoria ,Producto} from "../models/index.js";
import mongoose from "mongoose";




const { ObjectId } = mongoose.Types;

const coleccionesPermitidas = ["user", "categorias", "productos", "roles"];


const buscarUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {


    const usuario = await Usuario.findById(termino);
    return res.json({
      results: (usuario) ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({

    $and: [
  {
    $or: [
      { estado: { $in: [true, "true"] } }

    ]
  },
  {
    $or: [
      { nombre: regex },
      { correo: regex }
    ]
  }
]
});
 return res.json({
    results: usuarios,
  });
};
const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {


    const producto= await Producto.findById(termino).populate("categoria","nombre")
    return res.json({
      results: (producto) ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");
 const productos = await Producto.find({
  $and: [
    { estado: { $in: [true, "true"] } },
    { nombre: regex }
  ]
}).populate("categoria","nombre")
 return res.json({
    results: productos,
  });
};
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {


    const categoria = await Categoria.findById(termino);
    return res.json({
      results: (categoria) ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const categorias = await Categoria.find({nombre:regex , estado: true
});
 return res.json({
    results: categorias,
  });
};



const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las coleciones permitidas son : ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case "user":
     return buscarUsuario(termino, res);
      break;
    case "categorias":
        return buscarCategorias(termino ,res)
      break;
    case "productos":
       return buscarProductos(termino ,res)
      break;


    default:
      res.status(500).json({
        msg: "se le olvido hacer esta busqueda",
      });
  }
};

export default buscar;
