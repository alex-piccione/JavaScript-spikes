// remove check of file
var angular = angular || null;
var describe = describe || null;
var it = it || null;
var beforeEach = beforeEach || null;
var xdescribe = xdescribe || null;
var xit = xit || null;
var expect = expect || null;

// prepare the mock of Angular module

var app = angular.module("test", []);

beforeEach(function(){

    module("test");    // this is angular.mock.module(), not angular.module() !!!

});	
