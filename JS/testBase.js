// remove check of file
var angular = angular;
var describe = describe || null;
var it = it || null;
var beforeEach = beforeEach || null;
var _describe = _describe || null;
var _it = _it || null;
var expect = expect;

// prepare the mock of Angular module

var app = angular.module("test", []);

beforeEach(function(){
alert("module");
    module("test");    // this is angular.mock.module(), not angular.module() !!!

    //html = "<div>Amount: <inputAmountField></div>";      
});	