const   middleware  = {},
        Campground  = require("../models/campground")
        Comment  = require("../models/comment")

middleware.checkOwnershipCampground = function checkOwnershipCampground(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campground){
            if (err) {
                console.log(err)
                res.redirect("back")
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

middleware.checkOwnershipComment = function checkOwnershipComment(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.id, function(err, campground){
            if (err) {
                console.log(err)
                res.redirect("back")
            } else {
                if (campground.author.id.equals(req.user.id)) {
                    next()
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

middleware.isLoggedIn = function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = middleware