import { response } from "express";
import Producto from "../models/producto.js";
import Categoria from "../models/categoria.js"

//obtner categorias - paginado-total-populares

const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
};

// obtener categoria por id

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombres")
    .populate("categoria", "nombre");
  res.json(producto);
};




const creaProducto = async (req, res = response) => {
  // 1. Validar que el campo 'nombre' exista en el cuerpo de la solicitud
  if (!req.body.nombre) {
    return res.status(400).json({
      msg: "El nombre de la categoría es obligatorio.",
    });
  }

  const {estado , usuario , ...body} = req.body;

  const productoDB = await Producto.findOne({ nombre:body.nombre });

  // 2. Lógica de validación invertida: Si la categoría existe, entonces devuelve el error 400.
  if (productoDB) {
    // ¡Se cambió la negación!
    return res.status(400).json({
      // Se usa el nombre de la variable 'nombre' que ya está en mayúsculas
      msg: `El producto ${nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    // Asumiendo que req.usuario existe y es inyectado por un middleware de autenticación
    usuario: req.usuario._id,
  };

  console.log(data);

  // 3. Guardado en la BD: Se usa la instancia, no la Clase.
  const producto = new Producto(data);
  await producto.save();

  // Respuesta exitosa
  res.status(201).json(producto);
};




const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;



  if(data.nombre){
    data.nombre = data.nombre.toUpperCase();
  }
  
  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};




const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado);
};
export {
  creaProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
