const express = require('express');
    let app = express();
const path = require('path');
const apiRoute = require("./server/routes/api");

// tell express the angular app is static and where to find it
app.use(express.static(path.join(__dirname, "dist/nasa-project")));

// catches all routes that begin with /api
app.use("/api",apiRoute);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "dist/nasa-project/index.html"));
});

const port = process.env.PORT || 4200;
app.listen(port,()=>{
   console.log(`running on port ${port}`);
});