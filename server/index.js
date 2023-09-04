const express = require('express');
const app = express();
const router=require('./Route/router');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8000,(req,res)=>{
    console.log("App Started");
});
