if(!app) throw Error("app is undefined here?");

var config = config || {};
var decimalSeparator = config.decimalSeparator || ".";   // numeric decimal separator character

//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
// todo: maibe a factory is a better solution?

(function(decimalSeparator){
app.factory("CalculatorService", function(){    
    
    this.decimalSeparator = decimalSeparator;
        
    var service = {};
    this.evaluate = function(expression){
        return 1;        
    };
    
    
    // inspired by: http://mathjs.org/examples/browser/custom_separators.html.html

    service.parse = function(text, decimalSeparator){
        // replace the custom separators in the input with the default separators
        var argsSeparator = ";";
        return parseFloat(
            text
            .replace(new RegExp('\\' + decimalSeparator + '|\\' + argsSeparator, 'g'), function (match) {
            return match == decimalSeparator ? '.': ',';
            })
        );    
    };

    service.render = function(value, decimalSeparator){
        // replace the default separators in the output with custom separators
        var argsSeparator = ";";
        return value.toString()
            .replace(new RegExp(',|\\.', 'g'), function (match) {
            return match == '.' ? decimalSeparator : argsSeparator;
            });    
    };
        
    
    return service;    
})
})(decimalSeparator);


