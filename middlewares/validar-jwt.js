const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');  // Importar el módulo path


const Usuario = require('../models/usuario');

const userDataPath = path.join(__dirname, '../models/usuario.json');
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        // leer el usuario que corresponde al uid        
        const usuario = userData.find(u => u.id === uid);

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}