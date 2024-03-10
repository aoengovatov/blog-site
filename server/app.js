const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose
    .connect(
        'mongodb+srv://aoengovatov:<password>@cluster0.ndz6eui.mongodb.net/blog-site?retryWrites=true&w=majority&appName=Cluster0"'
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Server start on port ${port}`);
        });
    });
