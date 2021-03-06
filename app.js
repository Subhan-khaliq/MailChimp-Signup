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
    const url = "https://usX.api.mailchimp.com/3.0/lists/"+yourlistid;
    const options = {
        method : "POST",
        auth : yourAPIKEY
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

