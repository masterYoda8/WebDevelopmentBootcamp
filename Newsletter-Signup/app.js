require("dotenv").config();

const apiKey = process.env.API_KEY;
const audienceID = process.env.AUDIENCE_ID;

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const url = "https://us21.api.mailchimp.com/3.0/lists"
    const name = req.body.name;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name
                }
            }
        ]
    }

    const options = {
        method: "POST",
        auth: "florian1:" + apiKey,
    }

    const jsonData = JSON.stringify(data);
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

})


app.listen(3000, function(){
    console.log("Server started on port 3000.");
});