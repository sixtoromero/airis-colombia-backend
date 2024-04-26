const { response } = require("express");
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');  // Importar el módulo path
const { generarJWT } = require("../helpers/generarJWT");

// Resolviendo la ruta de forma segura
const userDataPath = path.join(__dirname, '../data/users.json');

const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));

const login = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {        
        // Verificar si el email existe
        const usuario = userData.find(u => u.email === email);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario / Password no son correctos - correo' });
        }        

        //Verificar la contraseña        
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(404).json({ msg: 'Usuario / Password no son correctos - password',  password });
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
            msg: 'Ha ocurrido un error inesperado, hable con el administrador'
        });
    }    
}

const authPost = (req, res) => {            

    const id = userData.length + 1;

    const {email, password} = req.body;

    const usuario = userData.find(u => u.email === email);

    if (usuario) {
        return res.status(404).json({ msg: 'El correo ya existe en la base de datos.' });
    }    

    const users = userData;

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const passCrypt = bcryptjs.hashSync( password, salt );    

    const newUser = {
        id,
        email,
        "password": passCrypt
    };

    // Añadir el nuevo ítem
    users.push(newUser);

    // Escribir el array actualizado de vuelta al archivo JSON
    fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));

    res.status(201).send({ msg: 'Usuario registrado con éxito!', newUser });

}

const renewToken = async(req, res = response) => {

    const id = req.id;

    // Generar el TOKEN - JWT
    const token = await generarJWT( id );


    res.json({
        ok: true,
        token
    });

}


module.exports = {
    login,
    authPost,
    renewToken
};