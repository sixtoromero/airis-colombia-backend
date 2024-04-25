const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { projectsGet, projectsPost, projectsPut } = require('../controllers/projects');

router.get('/', [validarJWT], projectsGet);
router.post('/', [validarJWT], projectsPost);
router.put('/', [validarJWT], projectsPut);

module.exports = router;