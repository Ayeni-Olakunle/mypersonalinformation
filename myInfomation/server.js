const express = require('express');
const dotenv = require("dotenv").config();
const port = process.env.PORT_ENV || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db")

const app = express();

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/info", require("./routes/infoRoutes"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Serve started on port ${port}`);
})