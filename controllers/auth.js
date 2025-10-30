import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import generarJwt from "../helpers/generarJWT.js";

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    console.log('Datos recibidos:', { correo, password: '***' });

    try {

        // verifivar si el email existe
        const usuario = await Usuario.findOne({ correo });
        console.log('Usuario encontrado:', usuario ? 'Sí' : 'No');

        if (!usuario) {
            return res.status(400).json({
                msg: "usuario / password no son correctos - correo"
            })
        }

        // si el usuario esta activo   

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "usuario / password no son correctos - estado:false"
            })
        }


        // verifica la contraseña 
        console.log('Verificando password...');
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        console.log('Password válido:', validPassword);

        if (!validPassword) {
            return res.status(400).json({
                msg: "usuario / Password no son correctos -password"
            })
        }




        // generar el 

        const token = await generarJwt(usuario.id);
        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hable con el administrador"
        })


    }


}

export { login }