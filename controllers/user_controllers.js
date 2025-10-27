import { response , request } from "express";

export const usuarioGet = (req = request, res = response) => {

  const {q , nombre = "no ame" ,apikey , page = 1 , limit} = req.query;

  res.json({
    msg: "get API -controlador",
    q,
    nombre,
    apikey,
    page,
    limit

  });
};

export const usuarioPut = (req, res = response) => {

  const id = req.params.id;
  res.json({
    msg: "put API - controller",
    id
  });
};

export const usuarioPost = (req, res = response) => {
  const {nombre , edad} = req.body;
  res.status(201).json({
    msg: "post API - controller",
    nombre,
    edad
  });
};
export const usuarioDelete = (req, res = response) => {
      res.json({
        msg: "delete API - controller"
      });
    }
export const usuarioPatch = (req, res = response) => {
      res.json({
        msg: "patch API- controller"
      });
    }    
