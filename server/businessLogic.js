//const dal = require('./DataAccessLayer');

// Business logic to get all entries
function getEntries() {
    return dal.getEntries();
}

// Business logic to add an entry
function addEntry(entry) {
    // Perform validations or any additional processing here
    if (!entry.name || !entry.age || !entry.email) {
        throw new Error("All fields are required.");
    }
    return dal.addEntry(entry);
}

// Business logic to delete an entry
function deleteEntry(id) {
    if (!id) {
        throw new Error("ID is required for deletion.");
    }
    return dal.deleteEntry(id);
}

const validateData = async (filename) => {
    try {
        const data = await dal.readFile(filename);
        // Add validation logic here
        return data;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getEntries,
    addEntry,
    deleteEntry
};

