import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
});


ProductoSchema.methods.toJSON = function () {
  const { __v,estado ,  ...data } = this.toObject();
  return data;
}



export default mongoose.model("Producto", ProductoSchema);
