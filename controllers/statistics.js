const { response } = require('express');
const fs = require('fs');
const path = require('path');

// Resolviendo la ruta de forma segura
const statisticsDataPath = path.join(__dirname, '../models/statistics.json');
const statisticsData = JSON.parse(fs.readFileSync(statisticsDataPath, 'utf8'));

const statisticsGet = (req, res = response) => {
    res.json({
        msg: 'success',
        statisticsData
    });
}

module.exports = {
    statisticsGet
}