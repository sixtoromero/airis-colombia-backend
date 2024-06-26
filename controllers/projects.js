const { response } = require('express');
const fs = require('fs');
const path = require('path');

// Resolviendo la ruta de forma segura
const projectsDataPath = path.join(__dirname, '../data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

const projectsGet = (req, res = response) => {
    res.json({
        msg: 'success',
        projectsData
    });
}

const projectsPost = (req, res) => {            

    const id = projectsData.length + 1;

    const {descripcion, latitud, longitud} = req.body;

    const locations = projectsData;

    const newLocation = {
        id,
        descripcion,
        latitud,
        longitud
    };

    // Añadir el nuevo ítem
    locations.push(newLocation);

    // Escribir el array actualizado de vuelta al archivo JSON
    fs.writeFileSync(projectsDataPath, JSON.stringify(locations, null, 2));

    res.status(201).send({ msg: 'Localización registrada con exito!', newLocation });

}

const projectsPut = (req, res) => {

    const {id, descripcion, latitud, longitud} = req.body;

    const locations = projectsData;

    const locationUpdates = {
        id,
        descripcion,
        latitud,
        longitud
    };

    const index = projectsData.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).send({ message: 'Location not found' });
    }

    // Actualizar el elemento
    locations[index] = {...projectsData[index], ...locationUpdates};
    
    fs.writeFileSync(projectsDataPath, JSON.stringify(locations, null, 2));

    res.status(201).send({ msg: 'Localización actualizada con exito!', locations });

}

module.exports = {
    projectsGet,
    projectsPost,
    projectsPut
}