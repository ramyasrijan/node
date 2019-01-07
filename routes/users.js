var express = require('express');
var router = express.Router();
var Request = require("request");
var https = require ('https');


/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body);
  var response = req.body;
  var city = response.queryResult.parameters['geo-city'];
  var country = response.queryResult.parameters['geo-country-code'].name;
    var appId="9e8a0994399f3e4b24cc2e9efd49dc5c";
    if(city == ""){
        q=country;
    }else{
        q=city;
    }
    var pathString = "/data/2.5/weather?q="+q+"&units=imperial&appid=" + appId;
    console.log(pathString);

    Request.get('https://api.openweathermap.org'+pathString, (error, response, body) => {
        if (error) {
            console.log('error:', error);
        }
        var jsonData = JSON.parse(body);
        if (jsonData.message === 'city not found') {
            result = 'Unable to get weather '+  jsonData.message;
        }else{
            result = 'Right now its '+jsonData.main.temp +' degrees with '+  jsonData.weather[0].description;
        }
        var responseObj = {
            "fulfillmentText" : "",
            "fulfillmentMessages" : [{"text" : { "text" : [result]}}],
            "source":""
        };
        return res.json(responseObj);
    });
});

module.exports = router;
