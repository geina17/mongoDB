//include the momenjs library
var mom = require('moment');
var riki = require('mongoose');
//create Schema class
var Schema = riki.Schema;
//create article Schema
var artSchema = new Schema({
    //title of article
    title: {
        type: String,
        required: true,
    },
    //link to article
    link: {
        type: String,
        required: true
    },
    //summary ot article
    summary: {
        type: String,
        required: true
    },
    updated: {
        type: String,
        default: mom().format('MMMM Do YYYY, h:mm A')
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});
var Article = riki.model('Article', artSchema);
module.exports = Article;