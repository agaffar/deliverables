/**
 * Created by SB004 on 3/20/2017.
 */

var successResponse = function (status,data,pagination,message) {
    this.status = status;
    this.data = data;
    this.message = message;
    if(pagination){
        this.pagination = {};
        this.pagination.total = pagination.total;
    }
}

module.exports = successResponse;