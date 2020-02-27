const express = require("express")
const app = express()

app.get("/", function(req, res){
    res.render("landing.ejs")
})

app.get("/campgrounds", function(req, res){
    const campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2d7cdc9645c65a_340.jpg"},
        {name: "Granite Hills", image: "https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c7d2d7cdc9645c65a_340.jpg"},
        {name: "Mountain Goats", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2d7cdc9645c65a_340.jpg"},
    ]
    res.render("campgrounds.ejs", {campgrounds: campgrounds})
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000!")
})