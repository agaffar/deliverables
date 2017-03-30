/**
 * Created by SB004 on 3/30/2017.
 */
var commonUtils = {
    isEmpty : isEmpty
}
function isEmpty(recObject){
    if(recObject == undefined || recObject ==null){
        return true;
    }
    else {
        return false;
    }
}

module.exports = commonUtils;