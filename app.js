const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        methodOverride  = require("method-override"),
        PORT            = process.env.PORT || 3000,
        User            = require("./models/user"),
        seeds           = require("./seeds"),
        expressSession  = require("express-session"),
        campgroundRoutes= require("./routes/campgrounds"),
        commentRoutes   = require("./routes/comments"),
        indexRoutes     = require("./routes/index")

// seeds.seedDB()

//mongodb://localhost/campground
mongoose.connect("mongodb+srv://admin:crNdmtn9FQymAlJQ@cluster0-6tibu.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Connection to the database established!")
}).catch(err => {
    console.log("Database error")
    console.log(err.message)
})



app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(PORT, function () {
    console.log("Server is listening on port 3000!")
})