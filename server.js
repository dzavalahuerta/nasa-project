const express = require('express');
    let app = express();
const path = require('path');
// check for production port
const port = process.env.PORT || 4200;
const api = require("./server/routes/api");

// tell express the angular app is static
app.use(express.static(path.join(__dirname, "dist/nasa-project")));

// catches all routes that begin with /api
app.use("/api",api);

// catch all other routes request and return it to the index
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "dist/nasa-project/index.html"));
});

// the port we are running on
app.listen(port,()=>{
   console.log(`running on port ${port}`);
});