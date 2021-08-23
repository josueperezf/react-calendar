const { response, request } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req = request, res = response) => {
    try {
        const eventos = await Evento.find().populate('user', 'name');
        res.status(200).json({
            ok: true,
            eventos
        });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearEvento = async (req = request, res = response) => {

    
    const {_id:user} = req.usuario;
    const evento = new Evento(req.body);
    evento.user = user;
    try {
        const eventoGuardado = await evento.save();
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEvento = async (req = request, res = response) => {
    const {id} =  req.params;
    const {_id} =  req.usuario;
    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            return  res.status(404).json({
                ok: false,
                msg: 'evento no encontrado',
            });
        }
        if(evento.user.toString() != _id) {
            return  res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de editar este registro',
            });
        }
        const nuevoEvento = {
            ...req.body,
            user: _id
        };
        // {new: true} es para que me traiga como quedo el registro en la base de datos luego de la actualizacion
        const eventoActualizado  = await Evento.findByIdAndUpdate(evento._id, nuevoEvento, {new: true});


        return  res.json({
            ok: true,
            msg: 'actualizarEvento',
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async (req = request, res = response) => {
    const {id} =  req.params;
    const {_id} =  req.usuario;
    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            return  res.status(404).json({
                ok: false,
                msg: 'evento no encontrado',
            });
        }
        if(evento.user.toString() != _id) {
            return  res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar este registro',
            });
        }
        // yo lo hice como esta en la siguiente linea comentada
        // await evento.deleteOne();
        await Evento.findByIdAndDelete(id);


        return  res.json({
            ok: true,
            msg: 'eliminarEvento',
        });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
/**
 * {
 * ok: true,
 * msg: 'obtener evento'
 * }
 */

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}