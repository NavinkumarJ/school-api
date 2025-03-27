const SchoolModel = require("../models/schoolModel");

// Haversine Formula for Distance Calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

// Add School API
exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid input. All fields are required and must be valid." });
    }

    SchoolModel.addSchool(name, address, latitude, longitude, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        res.status(201).json({ message: "School added successfully", id: result.insertId });
    });
};

// List Schools API (Sorted by Proximity)
exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Latitude and longitude are required and must be valid numbers." });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    SchoolModel.getAllSchools((err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });

        results.forEach((school) => {
            school.distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
        });

        results.sort((a, b) => a.distance - b.distance);

        res.json(results);
    });
};
