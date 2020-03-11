const   express     = require("express"),
        router      = express.Router(),
        User        = require("../models/user"),
        passport    = require("passport")

// ROOT ROUTE
router.get("/", function (req, res) {
    res.render("landing")
})

// GET ROUTE SIGNUP
router.get("/signup", function(req, res){
    res.render("signup")
})

// POST ROUTE SIGNUP
router.post("/signup", function(req, res){
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
router.get("/login", function(req, res){
    res.render("login")
})

// POST ROUTE LOGIN
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }) ,function(req, res){
})

// GET ROUTE LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds")
})

module.exports = router