// jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", function(req, res) {
    let day = date.getDate();    
    res.render("list", {listTitle: day, items: items});
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", items: workItems});
})

app.post("/", function(req, res) {
    let newItem = req.body.newItem;    
    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {    
        items.push(newItem);    
        res.redirect("/");
    }
});

app.post("/work", function(req, res) {
    let newItem = req.body.newItem;    
    workItems.push(newItem);    
    res.redirect("/work");
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});

