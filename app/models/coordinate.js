var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CoordinateSchema   = new Schema({
    idReceiver: String,
    lat:String,
    long:String,
    description:String,
    date:Date
});

module.exports = mongoose.model('Coordinate', CoordinateSchema);