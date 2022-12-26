const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json())

const db = require("./models")

//Routes
const postsRoutes = require("./routes/posts");
app.use("/api/posts", postsRoutes);
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Aplikacija pokrenuta");
    })
})
