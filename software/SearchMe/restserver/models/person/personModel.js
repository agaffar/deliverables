/**
 * Created by SB004 on 3/28/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var personSchema = new Schema({
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
        dateOfBirth:{
            type:Date ,
            trim:true,
            required: true
        },
        addresses:[{
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }]
    },
    {collection:'person'}
);
var personModel = mongoose.model('Person', personSchema);
module.exports=personModel;

