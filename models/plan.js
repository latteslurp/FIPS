var mongoose = require('mongoose');
var planSchema = new mongoose.Schema({
    name: String,
    detail: String
});

module.exports = planSchema;