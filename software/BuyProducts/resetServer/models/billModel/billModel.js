/**
 * Created by SB004 on 3/21/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var billSchema = new Schema({
        purchasedBy :{
            type : String,
            required : true
        },
        purchasedOn :{
            type : String,
            required : true
        },
        items:[{
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }],
        total :{
            type:SchemaTypes.Double ,
            trim:true,
            required: true
        }
    },
    {collection:'bill'}
);
/*productSchema.plugin(mongoosePaginate);*/
var billModel = mongoose.model('Bill', billSchema);
module.exports=billModel;

