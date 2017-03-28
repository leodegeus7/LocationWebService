var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FunctionSchema   = new Schema({
	id:String,
    collect:Boolean,
    view:Boolean
});

module.exports = mongoose.model('FunctionTest', FunctionSchema);