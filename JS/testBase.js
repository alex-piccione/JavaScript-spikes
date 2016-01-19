// prepare the mock of Angular module
var app = angular.module("test", []);

var config = {
    waitForCalculate: 50 // 50 milliseconds (used in the directive)    
}

beforeEach(function(){

    module("test");    // this is angular.mock.module(), not angular.module() !!!   

});	



var helper = (function Helper(){          
    
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    function getParamNames(func) {
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        return result || [];
    };
    
    /*
    given the string "this is a #one" an the values {one:"test"} it returns "this is a test"
    */
    function createDescription(description, values){  
        var placeHolders = description.match(/(#\w+)/g);
        if(!placeHolders) throw Error("Fail to recognize placeHolders in test description (" + description + ").");
        placeHolders.forEach(function(placeHolder, index){
            var newValue = values[placeHolder.substr(1)];  // remove the "#"
            description = description.replace(placeHolder, newValue);                    
        });    
        return description;
    };
        
            
    return {
        
        // inspired by: https://github.com/desirable-objects/neckbeard.js/blob/master/src/neckbeard.js
        // https://github.com/FrankyBoy/jasmine-params/blob/master/lib/jparams.js
        // https://www.npmjs.com/package/jasmine-params
        executeTestCases: function(params){
console.log(params);
            params.cases.forEach( function(element, index){
                var description = createDescription(params.description, element);       
                var paramNames = getParamNames(params.test);
                var parameters = [];
                
                paramNames.forEach(function(name){
                    if(!element.hasOwnProperty(name)) throw new Error('Element "' + name +'" not found in row #' + (index+1) + '" of values."' + element);
                    parameters.push(element[name]);                        
                });
        
                return it(description, function(){
                    params.test.apply(null, parameters);
                });                    
            });
        },            

    };
})();    

