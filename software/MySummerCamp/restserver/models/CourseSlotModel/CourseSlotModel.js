/**
 * Created by SB004 on 3/20/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var courseSlotSchema = new Schema({

        timeSlot:{
            type:String,
            trim:true,
            required: true
        },
        noOfStudents:{
            type:Number ,
            trim:true,
            required: true
        },
        availableSlots:{
            type:Number
        }
    },
    {collection:'courseSlot'}
);
var courseSlotModel = mongoose.model('CourseSlot', courseSlotSchema);
module.exports=courseSlotModel;

