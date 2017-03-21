/**
 * Created by SB004 on 3/21/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var productSchema = new Schema({
        name:{
            type:String,
            trim:true,
            required: true
        },
        category:{
            type:String,
            trim:true,
            required: true
        },
        price:{
            type:SchemaTypes.Double ,
            trim:true,
            required: true
        }
    },
    {collection:'products'}
);
/*productSchema.plugin(mongoosePaginate);*/
var productModel = mongoose.model('Product', productSchema);
module.exports=productModel;

