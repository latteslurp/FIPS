var mongoose    = require('mongoose');

var programSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            //reference to comment database
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    plans: [
        {
            name: String,
            detail: String
        }
    ]
});

module.exports = mongoose.model('Program', programSchema)
