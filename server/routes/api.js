const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const axios = require('axios');

const apodAPI = "https://api.nasa.gov/planetary/apod";

// get APOD
router.get('/10apod',asyncHandler(async(req,res)=>{
    const tenApodJSON = {tenApodArray: []};

    let currentDate = new Date();
    let year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;
    let day = currentDate.getUTCDate();

    let calculatedDate = new Date(`${year}-${month}-${day}`);
    let calyear = calculatedDate.getUTCFullYear();
    let calmonth = calculatedDate.getUTCMonth() + 1;
    let calday = calculatedDate.getUTCDate();

    while (tenApodJSON.tenApodArray.length < 10) {
        if(calday < 11){
            for (let i = 0; i < calday; i++) {
                //just in case this loop gets run
                if(tenApodJSON.tenApodArray.length === 10){
                    break;
                }  

                await axios.get(`${apodAPI}?date=${calyear}-${calmonth}-${calday-i}&api_key=gtVd6XMsShimUg52FqajelftZwHWosfHJc3FtCdQ`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                });
            }
            
            // this is to make sure no more code is run since we already reached 10 items
            // in the array. Also reseting the month and day is not necessary if the loop
            // above broke instead of finishing since that would mean there are still some
            // days left to loop through in that month
            if(tenApodJSON.tenApodArray.length === 10){
                break;
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
            for (let i = 0; i < 10; i++) {
                // maybe this is not necessary
                // 
                // 
                if(tenApodJSON.tenApodArray.length === 10){
                    break;
                }

                await axios.get(`${apodAPI}?date=${calyear}-${calmonth}-${calday-i}&api_key=gtVd6XMsShimUg52FqajelftZwHWosfHJc3FtCdQ`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                });
            }
        }
    }


    res.status(200).json(tenApodJSON)
}));

module.exports = router;