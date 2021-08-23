const { response } = require("express");
const bcrypt =  require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response ) => {
    const {name, email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe un usuario con este correo',
            });
        }
        usuario = new Usuario(req.body);
        // encriptar cobntraseña
        const salt =  bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'ha ocurrido un problema, hable con el administrador',
        });
    }
}

const loginUsuario = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo',
            });
        }

        // confirmar el password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto',
            });
        }

        // si llega aca, hay que generar el token
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'ha ocurrido un problema, hable con el administrador',
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const {usuario} = req;
    const {_id, name} = usuario;
    // si llega aca, hay que generar el token
    const token = await generarJWT(_id, name);
    res.json({
        ok: true,
        msg: 'renew',
        token,
        uid: _id,
        name,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}