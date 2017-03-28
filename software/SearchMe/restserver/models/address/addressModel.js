/**
 * Created by SB004 on 3/28/2017.
 */

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var addressSchema = new Schema({
        street:{
            type:String,
            trim:true,
            required: true
        },
        houseNo:{
            type:String,
            required: true
        },
        city:{
            type:String ,
            trim:true,
            required: true
        },
        state:{
            type: String,
            required : true
        }
    },
    {collection:'address'}
);
var addressModel = mongoose.model('Address', addressSchema);
module.exports=addressModel;

