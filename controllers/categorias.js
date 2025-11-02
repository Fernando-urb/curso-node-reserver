import { response } from "express";
import Categoria from "../models/categoria.js";

//obtner categorias - paginado-total-populares

const obtenerCategorias = async (req, res = response) => {
  // Desestructuración de los parámetros de paginación
  const { limite = 5, desde = 0 } = req.query;

  // Filtro para buscar solo categorías activas
  const query = { estado: true };

  // Ejecuta el conteo y la búsqueda en paralelo para mayor velocidad
  const [total, categorias] = await Promise.all([
    // 1. Contar documentos que cumplen la condición 'query'
    Categoria.countDocuments(query), // <- ¡SIN LAS LLAVES ALREDEDOR DE QUERY!

    // 2. Buscar documentos que cumplen la condición 'query'
    Categoria.find(query) // <- ¡SIN LAS LLAVES ALREDEDOR DE QUERY!
      .populate("usuario", "nombre") // Muestra el nombre del usuario
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtener categoria por id

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombres");

  res.json(categoria);
};

const creaCategoria = async (req, res = response) => {
  // 1. Validar que el campo 'nombre' exista en el cuerpo de la solicitud
  if (!req.body.nombre) {
    return res.status(400).json({
      msg: "El nombre de la categoría es obligatorio.",
    });
  }

  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  // 2. Lógica de validación invertida: Si la categoría existe, entonces devuelve el error 400.
  if (categoriaDB) {
    // ¡Se cambió la negación!
    return res.status(400).json({
      // Se usa el nombre de la variable 'nombre' que ya está en mayúsculas
      msg: `La categoría ${nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    // Asumiendo que req.usuario existe y es inyectado por un middleware de autenticación
    usuario: req.usuario._id,
  };

  console.log(data);

  // 3. Guardado en la BD: Se usa la instancia, no la Clase.
  const categoria = new Categoria(data);
  await categoria.save();

  // Respuesta exitosa
  res.status(201).json(categoria);
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id; 
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};


const borrarCategoria = async (req , res = response)=>{
    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});


    res.json(categoriaBorrada)

}
export {
  creaCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
