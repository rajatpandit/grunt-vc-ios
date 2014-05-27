var async = require('async');
var  add1 = function (n, callback) {
    setTimeout(function () {
        callback(null, n + 1);
    }, 20);
};

var mul3 = function (n, callback) {
    setTimeout(function () {
        callback(null, n * 3);
    }, 200);
};

var add1mul3 = async.compose(mul3, add1);

add1mul3(4, function (err, result) {
    console.log(result);
});
