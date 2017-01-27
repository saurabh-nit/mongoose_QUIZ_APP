var mongoose = require ("mongoose");

var QuestionSchema = new mongoose.Schema({

        question : String,
          option : [{ type : String }],
         correct : String

});

module.exports = mongoose.model('Questionbank',QuestionSchema);
