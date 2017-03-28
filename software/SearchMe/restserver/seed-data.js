/**
 * Created by SB004 on 3/28/2017.
 */
var async = require('async');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var fs = require("fs");
var personModel=require('./models/person/personModel');
var addressModel=require('./models/address/addressModel');
var Q = require('q');
mongoose.connect('mongodb://localhost/searchMe');
var db = mongoose.connection;
var dbCollection = db.collections;
console.log("connected and collections are : "+dbCollection);
//console.log(dbCollection);
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("./sampleData.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
console.log("length = "+jsonContent.length);
var allPersons = [];

for(var i = 0; i<jsonContent.length; i++){
    var eachPerson = jsonContent[i];
    insertEachPerson(eachPerson);
}
function insertEachPerson(eachPerson){
var promises = [];
    var newPerson = {
        "firstName" : eachPerson.firstName,
        "lastName" : eachPerson.lastName,
        "dateOfBirth" : eachPerson.dateOfBirth,
    };
    newPerson.addresses = [];
    eachPerson.addresses.forEach(function(eachAddress) {
        promises.push(insertEachAddress(newPerson, eachAddress));
    });
    Q.allSettled( promises ).then(function (resp) {
        var person = personModel(newPerson);
        console.log(person);
        person.save(function (err) {
            if (err) {
                console.log(err);
                //return err;
            }
            else {
                console.log("persons saved");
            }
        });
    });
}
function insertEachAddress(newPerson, eachAddress){
    console.log(eachAddress)
    var defered = Q.defer();
    var address = new addressModel({
        "street" : eachAddress.street,
        "houseNo" : eachAddress.houseNo,
        "city" : eachAddress.city,
        "state" : eachAddress.state
    });
    console.log(address);
    address.save(function(err){
       if(err){
           console.log(err);
           defered.reject("rejected");
       }
        else{
           console.log("saved");
           newPerson.addresses.push(address._id);
           defered.resolve();
       }
    });
    return defered.promise;
}