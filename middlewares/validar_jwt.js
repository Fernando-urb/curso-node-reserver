import jwt from "jsonwebtoken"
import response, { request } from "express"
import Usuario from "../models/usuario.js"

const validarJWT = async (req = request, res = response, next) => {


    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: "no hay token en la peticion "
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leeer el usuario que corresponde 
        const usuario = await Usuario.findById(uid);
        //verificar si el uid tiene estado en true
         if(!usuario){
            return res.status(401).json({
                msg: "token no valido - usuario no esxiste en bd"
            })
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg: "token no valido - usuario en estado : false"
            })
        }




        req.usuario = usuario;


        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "token no valido"
        })


    }
}

export default validarJWT