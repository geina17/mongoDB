//require mongoose
var riki = require('mongoose');
var Schema = riki.Schema;
var CommSchema = new Schema({
    author: {
        type: String
    },
    comment: {
        type: String
    }
});
var Comm = riki.model('Comm', CommSchema);
module.exports = Comm;
