/**
 * Rutas de usuarios
 * host + /api/eventos
 */

const {Router} = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventos');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// la siguiente linea es para decir de manera global, que cada uno de mis router, deben pasar por el middleware validarJWT

router.use(validarJWT);

router.get('/', getEventos);
router.post('/', [
        check('title', 'El titulo es obligatorio').trim().not().isEmpty(),
        check('notes', 'Las notas son obligatorias').trim().not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'la fecha de fin es obligatoria').custom(isDate),
        validarCampos
], crearEvento);
router.put('/:id',
        [
                check('title', 'El titulo es obligatorio').trim().not().isEmpty(),
                check('notes', 'Las notas son obligatorias').trim().not().isEmpty(),
                check('start', 'la fecha de inicio es obligatoria').custom(isDate),
                check('end', 'la fecha de fin es obligatoria').custom(isDate),
                validarCampos
        ],
        actualizarEvento);
router.delete('/:id', eliminarEvento);
 
 module.exports =  router;