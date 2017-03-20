/**
 * Created by SB004 on 3/20/2017.
 */

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var studentSchema = new Schema({

        firstName:{
            type:String,
            trim:true,
            required: true
        },
        lastName:{
            type:String,
            trim:true,
            required: true
        },
        email:{
            type:String,
            trim:true,
            required: true
        },
        course:{
            type:Schema.Types.ObjectId,
            ref: 'Course'
        }
    },
    {collection:'students'}
);
var studentModel = mongoose.model('Student', studentSchema);
module.exports=studentModel;

