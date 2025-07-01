const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((error) => console.log("error", error));
