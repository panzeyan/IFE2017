var event = {
    clientList: [],
    listen: function (attr, callback) {
        if (!this.clientList[attr]) {
            this.clientList[attr] = [];
        }
        this.clientList[attr].push(callback);
    },
    trigger: function () {
        var attr = Array.prototype.shift.call(arguments),
            callbackList = this.clientList[attr];
        
        if (!callbackList || callbackList.length === 0) {
            return;
        }

        for (var i = 0; i < callbackList.length; i++) {
            var callback = callbackList[i];
            callback.apply(this, arguments);
        }
    }
}

var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}
