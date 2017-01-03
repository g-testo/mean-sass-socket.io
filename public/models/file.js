var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FileSchema   = new Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('File', FileSchema);
