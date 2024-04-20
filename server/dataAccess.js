const fs = require('fs');
const path = require('path');

const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

module.exports = { readFile };
