var mongoose = require ("mongoose");

var SummarySchema = new mongoose.Schema({

            name : String,
           score : Number,
            time : String

});

module.exports = mongoose.model("Short",SummarySchema);
