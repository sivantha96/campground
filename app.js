const express       = require("express")
const app           = express()
const bodyParser    = require("body-parser")
const mongoose      = require("mongoose")

mongoose.connect("mongodb://localhost/campground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection to the database established!")
}).catch(err => {
    console.log("Database error")
    console.log(err.message)
})
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine","ejs")

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
})

//MODEL SETUP
const Campground = mongoose.model("Campground", campgroundSchema)

app.get("/", function(req, res){
    res.render("landing")
})

//INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds})
        }
    })
})

//NEW
app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

//CREATE
app.post("/campgrounds", function(req, res){
     const name = req.body.name
     const image = req.body.image
     const description = req.body.description
     const newCampground = {name: name, image:image, description:description}
     Campground.create(newCampground, function(err, newCampground) {
         if (err) {
             console.log(err);
         } else {
            res.redirect("/campgrounds")
         }
     })
})

//SHOW
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground})
        }
    })
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000!")
})