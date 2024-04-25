const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { projectsGet, projectsPost } = require('../controllers/projects');

router.get('/', [validarJWT], projectsGet);
router.post('/', [validarJWT], projectsPost);

module.exports = router;