"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.syncForEach = function (callback, ending_function) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var index = -1;
        var next = function () {
            index++;
            if (_this.length > index) {
                if (_this.length > 0) {
                    callback(_this[index], next, index + 1, _this.length);
                }
            }
            else {
                if (ending_function)
                    ending_function();
            }
        };
        next();
    });
};
