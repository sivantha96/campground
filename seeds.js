const mongoose      = require("mongoose")
const Campground    = require("./models/campground")
const Comment       = require("./models/comment")

const data = [
    {
        name: "Meemure",
        image: "https://q-cf.bstatic.com/images/hotel/max1280x900/163/163947161.jpg",
        description: "Bacon ipsum dolor amet bresaola doner hamburger leberkas beef ribs bacon brisket biltong prosciutto. Rump filet mignon meatball porchetta, strip steak bresaola sausage shankle burgdoggen alcatra pig frankfurter turkey. Alcatra ball tip turducken, pork belly biltong bresaola drumstick sausage t-bone cow doner shoulder cupim meatloaf. Chicken meatball tri-tip, biltong pastrami brisket cow cupim salami buffalo ribeye.",
    },
    {
        name: "Hortain Plains",
        image: "https://live.staticflickr.com/5042/5243264211_8809482541_b.jpg",
        description: "Swine pork hamburger shank, filet mignon brisket spare ribs. Beef ribs pig bresaola, picanha tongue meatloaf spare ribs shank pork ball tip short ribs andouille ground round corned beef. Boudin bacon ball tip rump meatball turducken, turkey short loin venison biltong jerky. Meatloaf jowl pancetta kielbasa buffalo porchetta. Burgdoggen tail meatloaf, sirloin ground round beef ribs andouille prosciutto venison t-bone ham hock meatball landjaeger biltong capicola. Boudin brisket short ribs pork belly.",
    },
    {
        name: "Mathale",
        image: "https://media-cdn.tripadvisor.com/media/vr-splice-j/06/6f/51/07.jpg",
        description: "Buffalo beef kielbasa, boudin leberkas bresaola beef ribs turducken drumstick. Drumstick leberkas meatball, andouille bacon porchetta kielbasa short ribs. Flank rump ham, shank tail alcatra porchetta beef ribs. Rump filet mignon chislic ground round meatloaf chicken burgdoggen flank pancetta salami hamburger ball tip buffalo venison. Kevin swine jowl ball tip burgdoggen beef cupim sirloin picanha jerky alcatra pancetta. Pork loin meatball frankfurter fatback picanha landjaeger, tri-tip drumstick venison chislic hamburger. Bacon landjaeger brisket pork belly, ham tongue swine.",
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