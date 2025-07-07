require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes=require("./src/Routes/Routes")
const bodyParser = require("body-parser");
require("./src/Config/Connection");
app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT ;

app.use('/app',routes)
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} `);
})