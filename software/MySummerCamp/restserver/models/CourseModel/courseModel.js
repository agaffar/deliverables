/**
 * Created by SB004 on 3/20/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var courseSchema = new Schema({
        courseName:{
            type:String,
            trim:true,
            required: true
        },
        courseFee:{
            type:SchemaTypes.Double ,
            trim:true,
            required: true
        },
        description:{
            type:String
        },
        duration:{
            type:String
        },
        noOfDays:{
            type:String
        },
        coach:{
            type:String
        },
        courseSlots:[{
            type: Schema.Types.ObjectId,
            ref: 'CourseSlot'
        }]
    },
    {collection:'course'}
);
var courseModel = mongoose.model('Course', courseSchema);
module.exports=courseModel;

