const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const axios = require('axios');

const apodAPI = "https://api.nasa.gov/planetary/apod";

// get APOD
router.get('/',asyncHandler(async(req,res)=>{
    let apodArray = {apodArray: []};

    let currentDate = new Date();
    let year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;
    let day = currentDate.getUTCDate();

    let calculatedDate = new Date(`${year}-${month}-${day}`);
    let calyear = calculatedDate.getUTCFullYear();
    let calmonth = calculatedDate.getUTCMonth() + 1;
    let calday = calculatedDate.getUTCDate();

    while (apodArray.apodArray.length < 10) {
        if(calday < 11){
            for (let i = 0; i < calday; i++) {
                await axios.get(`${apodAPI}?date=${calyear}-${calmonth}-${calday-i}&api_key=gtVd6XMsShimUg52FqajelftZwHWosfHJc3FtCdQ`)
                .then(apod=>{
                    apodArray.apodArray.push(apod.data);
                });
                
                if(apodArray.apodArray.length === 10){
                    break;
                }        
            }
            
            if(calmonth > 1){
                calmonth -= 1;
            }
            else{
                calmonth = 12;
            }

            if(calmonth === 1){
                calday = 28;
            }
            else if(calmonth === 3 || calmonth === 5 || calmonth === 8 || calmonth === 10){
                calday = 31;
            }
            else{
                calday = 30;
            }
            
        }
    
        if(calday > 11){
            console.log(calculatedDate);
            for (let i = 0; i < 10; i++) {
                await axios.get(`${apodAPI}?date=${calyear}-${calmonth}-${calday-i}&api_key=gtVd6XMsShimUg52FqajelftZwHWosfHJc3FtCdQ`)
                .then(apod=>{
                    apodArray.apodArray.push(apod.data);
                });
                
                if(apodArray.apodArray.length === 10){
                    break;
                }
            }
        }
    }


    res.status(200).json(apodArray)
}));

module.exports = router;