const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { statisticsGet } = require('../controllers/statistics');

router.get('/', [validarJWT], statisticsGet);

module.exports = router;