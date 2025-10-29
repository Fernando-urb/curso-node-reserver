import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

export const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`el rol ${rol} no esta registrado en la BD`);
  }
};

export const emailExiste = async (correo = "") => {
  //verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`el correo : ${correo} ya esta registrado`);
  }
};


export const existeUserID = async (id ) => {
  //verificar si el correo existe
  const existeUser = await Usuario.findById(id);
  if (!existeUser) {
    throw new Error(`el id : ${id} ya esta registrado`);
  }
};