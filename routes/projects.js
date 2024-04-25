const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { projectsGet } = require('../controllers/projects');

router.get('/', [validarJWT], projectsGet);

module.exports = router;