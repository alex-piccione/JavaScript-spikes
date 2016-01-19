if(!app) throw Error("app is undefined here?");


//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/


app.factory("CalculatorService", function(){    
    
    // inspired by: http://mathjs.org/examples/browser/custom_separators.html.html

    this.parse = function(text, decimalSeparator){
        // replace the custom separators in the input with the default separators
        var argsSeparator = ";";
        return parseFloat(
            text
            .replace(new RegExp('\\' + decimalSeparator + '|\\' + argsSeparator, 'g'), function (match) {                
            return match == decimalSeparator ? '.': ',';
            })
        );    
    };

    this.render = function(value, decimalSeparator){
        // replace the default separators in the output with custom separators
        var argsSeparator = ";";
        return value.toString()
            .replace(new RegExp(',|\\.', 'g'), function (match) {
            return match == '.' ? decimalSeparator : argsSeparator;
            });    
    };
            

    var service = {};
    
    service.this = this;   // expse internal implementation hidden by closure
        
    
    service.eval = function(test){
        return 1;
    };  
    
    return service;    
})
