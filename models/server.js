const express = require('express')
var cors = require('cors')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000;        

        this.usuariosPath = '/api/users';
        this.authPath = '/api/auth';
        this.projectsPath = '/api/projects';
        this.statisticsPath = '/api/statistics';

        //Middelwares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors())
        //Parseo y lectura del body
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/users'));
        this.app.use(this.projectsPath, require('../routes/projects'));
        this.app.use(this.statisticsPath, require('../routes/statistics'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;