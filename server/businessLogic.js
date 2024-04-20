const dal = require('./dataAccess');

const validateData = async (filename) => {
    try {
        const data = await dal.readFile(filename);
        // Add validation logic here
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = { validateData };
