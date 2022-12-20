const express = require('express');
const app = express();

app.use(express.json())

const db = require("./models")

//Routes
const postRoutes = require("./routes/Posts");
app.use("/api/posts", postRoutes);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Aplikacija pokrenuta");
    })
})
