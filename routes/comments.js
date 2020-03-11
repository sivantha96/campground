const   express     = require("express"),
        router      = express.Router({ mergeParams: true}),
        Comment     = require("../models/comment"),
        Campground  = require("../models/campground"),
        User        = require("../models/user"),
        middleware  = require("../middleware")

// GET
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", { campground: campground, currentUser: req.body })
        }
    })
})

// POST
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
            redirect("/campgrounds/" + campground._id)
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

module.exports = router