var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationSchema   = new Schema({
    name: String,
    idServer:String,
    idFirebase:String,
    lat: String,
    long: String,
    created_at:Date,
    coordUpdate_at:Date,
    imageUser:String
});

module.exports = mongoose.model('Location', LocationSchema);