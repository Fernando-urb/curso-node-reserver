import { Schema, model } from "mongoose";

const RoleSchema = Schema({
  rol:{
    type:String,
    required : [true, "el rol es obligatorio"]
  }
});

export default model ( "Role" ,RoleSchema);
