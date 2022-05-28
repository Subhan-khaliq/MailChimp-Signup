const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { options } = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('Public'));
app.get('/', function(req, res)
{
    res.sendFile(__dirname + "/signup.html");
})
app.post('/', function(req, res)
{
    const FirstName = req.body.t;
    const LastName = req.body.m;
    const Email =  req.body.b;

    const data = {
        members : [
            {
                email_address : Email,
                status : "subscribed",
                merge_fields :{
                    FNAME : FirstName,
                    LNAME : LastName
                } 
            }
        ]
    };
    const jasonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/28dd5db3f3";
    const options = {
        method : "POST",
        auth : "subhan:81fcc19d9405ea5eb6f0e94141914742-us18"
    }
    const request = https.request(url, options, function(response)
    {
        if (response.statusCode == 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/faliure.html");
        }
         response.on("data", function(data)
        {
            
        })
    })
    request.write(jasonData);
    request.end();
});
app.post('/faliure', function(req, res)
{
    res.redirect('/');
})
app.listen(process.env.PORT || 3000);

//api key
//81fcc19d9405ea5eb6f0e94141914742-us18

//audience id
//28dd5db3f3