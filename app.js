const express       = require("express")
const app           = express()
const bodyParser    = require("body-parser")
const mongoose      = require("mongoose")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine","ejs")

const campgrounds = [
    {name: "Salmon Creek", image: "https://www.bluelankatours.com/wp-content/uploads/2017/08/Camping_Spots_In_Sri_Lanka.jpg"},
    {name: "Granite Hills", image: "https://blog.yohobed.com/wp-content/uploads/2017/10/What-you-need-to-know-when-camping-in-Sri-Lanka-1024x670.jpg"},
    {name: "Mountain Goats", image: "https://cdn.pixabay.com/photo/2017/11/05/18/49/camping-2921481_960_720.jpg"},
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