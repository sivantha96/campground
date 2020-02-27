const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine","ejs")

const campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2d7cdc9645c65a_340.jpg"},
    {name: "Granite Hills", image: "https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c7d2d7cdc9645c65a_340.jpg"},
    {name: "Mountain Goats", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2d7cdc9645c65a_340.jpg"},
]

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.post("/campgrounds", function(req, res){
     const name = req.body.name
     const image = req.body.image
     const newCampground = {name: name, image:image}
     campgrounds.push(newCampground)
     res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000!")
})