const express = require("express");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the School Management API",
        endpoints: {
            addSchool: "/api/addSchool",
            listSchools: "/api/listSchools?latitude=<value>&longitude=<value>"
        }
    });
});

app.use("/api", schoolRoutes);

module.exports = app;
