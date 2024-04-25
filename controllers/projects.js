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

module.exports = {
    projectsGet
}