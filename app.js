const express = require("express");
const mongoose  = require("mongoose");
//const connectionStrings = require ('connectionStrings')
  require("./database/connect");


const roomRoute = require("./routes/room");
const roomTypesRoute = require("./routes/roomTypes");
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(roomRoute);
app.use(roomTypesRoute);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});