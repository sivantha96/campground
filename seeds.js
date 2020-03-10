const mongoose      = require("mongoose")
const Campground    = require("./models/campground")
const Comment       = require("./models/comment")

const data = [
    {
        name: "Meemure",
        image: "https://q-cf.bstatic.com/images/hotel/max1280x900/163/163947161.jpg",
        description: "As she sat watching the world go by, something caught her eye. It wasn't so much its color or shape, but the way it was moving. She squinted to see if she could better understand what it was and where it was going, but it didn't help. As she continued to stare into the distance, she didn't understand why this uneasiness was building inside her body. She felt like she should get up and run. If only she could make out what it was. At that moment, she comprehended what it was and where it was heading, and she knew her life would never be the same.",
    },
    {
        name: "Hortan Plains",
        image: "https://live.staticflickr.com/5042/5243264211_8809482541_b.jpg",
        description: "Do you really listen when you are talking with someone? I have a friend who listens in an unforgiving way. She actually takes every word you say as being something important and when you have a friend that listens like that, words take on a whole new meaning.",
    },
    {
        name: "Mathale",
        image: "https://media-cdn.tripadvisor.com/media/vr-splice-j/06/6f/51/07.jpg",
        description: "What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an \"I\" which makes perfect sense, but is something I never noticed before. What have you noticed today?",
    },
]

exports.seedDB = function () {
    Campground.deleteMany({}, function(err){
        if (err) {
            console.log(err)
        } 
        console.log("Campgrounds removed")
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a campground")
                    Comment.create({
                        text: "This place is great",
                        author: "Homer"
                    }, function(err, comment){
                        if (err) {
                            console.log(err)
                        } else{
                            campground.comments.push(comment)
                            campground.save()
                            console.log("created comment!")
                        }
                        
                    })
                }
            })
        })
    })
    
}