/**
 * Created by SB004 on 3/22/2017.
 */
var commonUtil = {
    isEmpty : isEmpty
}
function isEmpty(object){
    if(object === undefined || object === null){
        return true;
    }else{
        return false;
    }
}
module.exports = commonUtil;