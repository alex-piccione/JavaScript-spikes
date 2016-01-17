// prepare the mock of Angular module
var app = angular.module("test", []);

var config = {
    waitForCalculate: 50 // 50 milliseconds (used in the directive)    
}

beforeEach(function(){

    module("test");    // this is angular.mock.module(), not angular.module() !!!   

});	
