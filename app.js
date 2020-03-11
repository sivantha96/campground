const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Campground = require("./models/campground")
const Comment = require("./models/comment")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")
const seeds = require("./seeds")
const expressSession = require("express-session")

// seeds.seedDB()
mongoose.connect("mongodb://localhost/campground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection to the database established!")
}).catch(err => {
    console.log("Database error")
    console.log(err.message)
})
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.use(expressSession({
    secret: "Campgrounds are cool",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/", function (req, res) {
    res.render("landing", {currentUser: req.user})
})

// =====================================
// Campground Routes
// =====================================

//INDEX
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user})
        }
    })
})

//NEW
app.get("/campgrounds/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new", {currentUser: req.user})
})

//CREATE
app.post("/campgrounds", isLoggedIn, function (req, res) {
    const name = req.body.name
    const image = req.body.image
    const description = req.body.description
    const newCampground = { name: name, image: image, description: description }
    Campground.create(newCampground, function (err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    })
})

//SHOW
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground, currentUser: req.user })
        }
    })
})

// =====================================
// Comment Routes
// =====================================

// GET
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground, currentUser: req.body })
        }
    })
})

// POST
app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
            redirect("/campgrounds/" + campground._id)
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

//=====================
// AUTH ROUTES
//=====================

// GET ROUTE SIGNUP
app.get("/signup", function(req, res){
    res.render("signup", {currentUser: req.body})
})

// POST ROUTE SIGNUP
app.post("/signup", function(req, res){
    const newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("signup")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    })
})

// GET ROUTE LOGIN
app.get("/login", function(req, res){
    res.render("login", {currentUser: req.user})
})

// POST ROUTE LOGIN
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }) ,function(req, res){
})

// GET ROUTE LOGOUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, function () {
    console.log("Server is listening on port 3000!")
})