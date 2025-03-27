const db = require("../config/db");

const SchoolModel = {
    addSchool: (name, address, latitude, longitude, callback) => {
        const query = "INSERT INTO schools (name, address, latitude, longitude, created_at) VALUES (?, ?, ?, ?, NOW())";
        db.query(query, [name, address, latitude, longitude], callback);
    },

    getAllSchools: (callback) => {
        db.query("SELECT * FROM schools", callback);
    }
};

module.exports = SchoolModel;
