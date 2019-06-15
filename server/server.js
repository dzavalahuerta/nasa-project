const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect("mongodb+srv://dzavalahuerta:Nasa-Project%21%40%23@cluster0-iorgi.mongodb.net/UserAuthentication?retryWrites=true&w=majority" || process.env.MONGOATLAS_URL, {useNewUrlParser: true});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist/nasa-project")));

app.use("/api",require("./routes/api"));
app.use('/users',require('./routes/users'));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "dist/nasa-project/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
   console.log(`running on port ${port}`);
});