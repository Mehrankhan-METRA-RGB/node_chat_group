const express = require("express");
const app = express();
const Port = process.env.PORT || 8000






app.listen(Port,
    console.log(`Server Running On Port ${Port}`)
)