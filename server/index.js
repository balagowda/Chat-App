require("dotenv").config();
const express = require('express');
const app = express();
const router=require('./Route/router');
const cors = require('cors');
require('./db/connection');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

app.listen(8000,(req,res)=>{
    console.log("App Started");
});
