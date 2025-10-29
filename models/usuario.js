import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "el correo es obligatorio"],
    unique: true,
  },
    password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
    img: {
    type: String,
  },
    rol: {
    type: String,
    required: true,
    enum:["ADMIN_ROLE" , "USER_ROLE"]
  },
    estado: {
    type: String,
    default:true
  },
    google: {
    type: String,
    default:false
  },

});

UsuarioSchema.methods.toJSON = function(){
  const {__v , password, ...user}= this.toObject();
  return user;
}


export default model ("Usuario" , UsuarioSchema);