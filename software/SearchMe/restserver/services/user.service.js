/**
 * Created by SB004 on 3/28/2017.
 */
var personModel = require('../models/person/personModel');
var addressModel = require('../models/address/addressModel');
var errorResponse = require('../models/errorResponse');
var successResponse = require('../models/successResponse');
var commonUtil = require('../utils/commonUtils');
var userData = {
    getDataSearched : getDataSearched
}
function getDataSearched(req,res){
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    var queryToPerform = [];
    var basicDet = [];
    if(query.fname)
    {
        var fnReg = new RegExp(query.fname,"i");
        basicDet.push({"firstName" : fnReg})
    }
    if(query.lname)
    {
        var lnReg = new RegExp(query.lname,"i");
        basicDet.push({"lastName" : lnReg})
    }
    if(query.dob)
    {

        basicDet.push({"dateOfBirth" : new Date(query.dob)})
    }
    if(basicDet.length != 0)
        queryToPerform.push({"$match":{ $or : basicDet}})
    queryToPerform.push({ "$unwind": "$addresses" },
        {"$lookup":{"from":"address","localField":"addresses","foreignField":"_id","as":"address"}});
    if(query.address){
        var addressQuery = new RegExp(query.address,"i");

        queryToPerform.push({"$match":{$or:[{"address.city":addressQuery}, {"address.street" : addressQuery},
            {"address.state" : addressQuery} ]}} )
    }
    queryToPerform.push({"$unwind":"$address"},{"$group":{"_id":"$_id", "data":{"$addToSet":{"addr":"$address",
            "user":{"_id": "$_id", "firstName" : "$firstName","lastName" : "$lastName",
                "dateOfBirth" : "$dateOfBirth" }}}}},
        {"$project":{"data.addr":1, "users":{"$arrayElemAt":["$data.user", 0] }}}

    );
    console.log(queryToPerform);
    personModel.aggregate(queryToPerform).skip(query.pagination.numberToSkip)
        .limit(query.pagination.limito).exec(function(err,users) {
        if (err) {
            console.log(err);
            res.send(new  errorResponse("error","failed dueto wrong query formation",err));
        } else {
            if(commonUtil.isEmpty(users) == false){
                console.log("users",users)
                personModel.aggregate(queryToPerform).exec(function(err1,response){
                    if(err1){
                        console.log(err);
                        res.send(new  errorResponse("error","failed dueto wrong query formation",err));
                    }
                    else {
                        if(commonUtil.isEmpty(response) != true){
                            var pagination = {};
                            pagination.total = response.length;
                            res.send(new successResponse("ok",users,pagination,"successfully data received"));
                        }
                        else{
                            res.send(new  errorResponse("error","no data found for such query params",err));

                        }

                    }

                });

            }
            else{
                res.send(new  errorResponse("error","no data found for such query params",err));

            }

        }
    });

}
module.exports = userData;