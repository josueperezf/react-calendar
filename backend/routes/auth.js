/**
 * Rutas de usuarios
 * host + /api/auth
 */

const {Router} = require('express');
const { check } = require('express-validator');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/',
    [
        check('email', 'El nombre es obligatorio').trim().not().isEmpty(),
        check('email', 'El email no esta en formato correcto').isEmail(),
        check('password', 'El password es obligatorio').trim().not().isEmpty(),
        check('password', 'El password no tiene la longitd minima permitida').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

router.post(
    '/new',[
        check('name', 'El nombre es obligatorio').trim().not().isEmpty(),
        check('email', 'El nombre es obligatorio').trim().not().isEmpty(),
        check('email', 'El email no esta en formato correcto').isEmail(),
        check('password', 'El password es obligatorio').trim().not().isEmpty(),
        check('password', 'El password no tiene la longitd minima permitida').isLength({min:6}),
        validarCampos
    ] ,
    crearUsuario );

router.get('/renew', validarJWT, revalidarToken);

module.exports =  router;