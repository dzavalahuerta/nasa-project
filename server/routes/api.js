const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const axios = require('axios');
const API = "https://api.nasa.gov";
const apiKey = 'gtVd6XMsShimUg52FqajelftZwHWosfHJc3FtCdQ';

router.get('/10apod/:date',asyncHandler(async(req,res)=>{
    const tenApodJSON = {tenApodArray: []};
    
    let date = req.params.date;

    let calculatedDate = new Date(date);
    let calYear = calculatedDate.getFullYear();
    let calMonth = calculatedDate.getMonth()+1;
    let calDay = calculatedDate.getDate();
    if(calMonth === 12 && calDay === 30){
        calDay += 1;
    }

    while (tenApodJSON.tenApodArray.length < 10) {
        if(calYear === 1996 && calMonth === 1 && calDay <=10){
            for (let i = 0; i < calDay; i++) {
                await axios.get(`${API}/planetary/apod?date=${calYear}-${calMonth}-${calDay-i}&api_key=${apiKey}`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                })
                .catch((err)=>{
                    console.log(err);
                    tenApodJSON.tenApodArray.push('');
                });
            }
            break;
        }
        else if(calYear === 1995){
            break;
        }
        if(calDay <= 10){
            for (let i = 0; i < calDay; i++) {
                await axios.get(`${API}/planetary/apod?date=${calYear}-${calMonth}-${calDay-i}&api_key=${apiKey}`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                })
                .catch((err)=>{
                    console.log(err);
                    tenApodJSON.tenApodArray.push('');
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
                
                await axios.get(`${API}/planetary/apod?date=${calYear}-${calMonth}-${calDay-i}&api_key=${apiKey}`)
                .then(apod=>{
                    tenApodJSON.tenApodArray.push(apod.data);
                })
                .catch((err)=>{
                    console.log(err);
                    tenApodJSON.tenApodArray.push('');
                });
            }
        }
    }
    res.status(200).json(tenApodJSON);
}));

router.get('/missionManifest/:roverName',asyncHandler(async(req,res)=>{
    let roverName = req.params.roverName;
    
    await axios.get(`${API}/mars-photos/api/v1/manifests/${roverName}?api_key=${apiKey}`)
    .then(missionManifest=>{
        res.status(200).json(missionManifest.data.photo_manifest);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
}));

router.get('/marsPhotos/:roverName/:sol/:pageNum',asyncHandler(async(req,res)=>{
    let roverName = req.params.roverName;
    let sol = req.params.sol;
    let pageNum = req.params.pageNum;

    await axios.get(`${API}/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&page=${pageNum}&api_key=${apiKey}`)
    .then(photos=>{
        res.status(200).json(photos.data.photos);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
}));

module.exports = router;