const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const axios = require('axios');

const apodAPI = "https://api.nasa.gov/planetary/apod";
let counter = 0;
// get 10 Astronomy Pictures of the Day
router.get('/10apod/:id',asyncHandler(async(req,res)=>{
    console.log(`response ${counter} has begun`);
    counter += 1;

    const tenApodJSON = {tenApodArray: []};

    let date = req.params.id;

    let calculatedDate = new Date(date);
    let calyear = calculatedDate.getFullYear();
    let calmonth = calculatedDate.getMonth()+1;
    let calday = calculatedDate.getDate();

    while (tenApodJSON.tenApodArray.length < 10) {
        if(calday <= 10){
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

            if(calmonth === 2){
                calday = 28;
            }
            else if(calmonth === 4 || calmonth === 6 || calmonth === 9 || calmonth === 11){
                calday = 30;
            }
            else{
                calday = 31;
            }
            
            if(calmonth === 12 && calday === 31){
                calyear -= 1;
            }
        }
    
        if(calday >= 11){
            for (let i = 0; i < calday; i++) {
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
    res.status(200).json(tenApodJSON);
}));

module.exports = router;