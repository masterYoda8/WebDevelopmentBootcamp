//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extendend: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save();
    res.render("secrets");

});

const findUser = async function(params) {
    return await User.findOne(params);
}
app.post("/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = await findUser({email: username});
    console.log(foundUser);
    if (!foundUser) {res.render("home");}
    if (foundUser.password === password) {
        res.render("secrets");
    } else {
        res.render("home");
    }
});



app.listen(3000, function() {
    console.log("Server started on port 3000.");
});

