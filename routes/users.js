const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [validarJWT], usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);

module.exports = router;