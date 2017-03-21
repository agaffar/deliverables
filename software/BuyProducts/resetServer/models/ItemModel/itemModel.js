/**
 * Created by SB004 on 3/21/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var itemSchema = new Schema({
        product:{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity:{
            type:Number,
            required: true
        },
        totalCost:{
            type:SchemaTypes.Double ,
            trim:true,
            required: true
        }
    },
    {collection:'item'}
);
/*productSchema.plugin(mongoosePaginate);*/
var itemModel = mongoose.model('Item', itemSchema);
module.exports=itemModel;

