const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlwware/errorMiddleware");
const port = process.env.PORT;
const connectDB = require("./config/db");
const colors = require("colors");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
