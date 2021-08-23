const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const validarJWT = async (req = request, res = response, next)=> {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok:false,
            msg:'No hy token en la peticion'
        });
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRET_JWT_SEED);
        // const usuario = await Usuario.findById(uid);
        const usuario = await Usuario.findOne({_id: uid});

        if(!usuario) {
            return res.status(401).json({
                ok:false,
                msg:'Token no valido - no existe en DB'
            });
        }


        // verificar si el usuario autenticado tiene estado true, o mejor dicho esta activo
        /*
        if(!usuario.estado) {
            return res.status(401).json({
                msg:'Token no valido - usuario con estado false'
            });
        }
        */
        req.usuario = usuario;
        next();
    } catch (error) {
        // console.log(error);
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }
}

module.exports = {
    validarJWT   
}