const { response } = require("express");
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');  // Importar el módulo path
const { generarJWT } = require("../helpers/generarJWT");

// Resolviendo la ruta de forma segura
const userDataPath = path.join(__dirname, '../data/users.json');

const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {        
        // Verificar si el email existe
        const usuario = userData.find(u => u.email === correo);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario / Password no son correctos - correo' });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(404).json({ msg: 'Usuario / Password no son correctos - password' });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        // Si todo es correcto, enviar respuesta
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }    
}

module.exports = {
    login
};
