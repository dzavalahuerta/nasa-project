const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const axios = require('axios');
const apodAPI = "https://api.nasa.gov/planetary/apod";
const apiKey = 'gtVd6XMsShimUg52FqajelftZwHWosfHJc3FtCdQ';

// dont forget to delete for production
let counter = 0;

router.get('/10apod/:id',asyncHandler(async(req,res)=>{
    console.log(`response ${counter} has begun`);
    counter += 1;
    
    const tenApodJSON = {tenApodArray: []};
    
    let date = req.params.id;
    console.log(date);
    
    let calculatedDate = new Date(date);
    let calYear = calculatedDate.getFullYear();
    let calMonth = calculatedDate.getMonth()+1;
    let calDay = calculatedDate.getDate();
    console.log(calculatedDate);
    console.log(calDay);
    
    while (tenApodJSON.tenApodArray.length < 10) {
        if(calDay <= 10){
            for (let i = 0; i < calDay; i++) {
                await axios.get(`${apodAPI}?date=${calYear}-${calMonth}-${calDay-i}&api_key=${apiKey}`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                });
            }
            if(tenApodJSON.tenApodArray.length < 10){
                if(calMonth > 1){
                    calMonth -= 1;
                }
                else{
                    calMonth = 12;
                }
    
                if(calMonth === 2){
                    calDay = 28;
                }
                else if(calMonth === 4 || calMonth === 6 || calMonth === 9 || calMonth === 11){
                    calDay = 30;
                }
                else{
                    calDay = 31;
                }
                
                if(calMonth === 12 && calDay === 31){
                    calYear -= 1;
                }
            }
        }
        if(calDay >= 11){
            for (let i = 0; i < calDay; i++) {
                if(tenApodJSON.tenApodArray.length === 10){
                    break;
                }
                
                await axios.get(`${apodAPI}?date=${calYear}-${calMonth}-${calDay-i}&api_key=${apiKey}`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                });
            }
        }
    }

    res.status(200).json(tenApodJSON);
}));

module.exports = router;