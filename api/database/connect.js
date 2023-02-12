const mongoose = require("mongoose");
// const Schema = mongoose.Schema
const connectionStrings = connectionStrings_URI;

mongoose
  .connect(connectionStrings, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO DB..."))
  .catch((err) => console.log(err));