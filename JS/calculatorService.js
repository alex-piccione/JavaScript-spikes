if(!app) throw Error("app is undefined here?");


//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/


app.factory("CalculatorService", function(){    
    
    // inspired by: http://mathjs.org/examples/browser/custom_separators.html.html

    this.parse = function(text, decimalSeparator){
        // replace the custom separators in the input with the default separators
        var argsSeparator = ";";
        return parseFloat(text
            .replace(new RegExp('\\' + decimalSeparator + '|\\' + argsSeparator, 'g'), function (match) {                
                return match == decimalSeparator ? '.': ',';
            })
        );    
    };

    this.render = function(value, decimalSeparator){
        //if(decimalSeparator === undefined) throw Error('"decimalSeparator" parameter is missing');
        decimalSeparator = decimalSeparator || ".";
        return value.toString().replace(".", decimalSeparator);
    };
            

    var service = {};
    
    service.this = this;   // expse internal implementation hidden by closure
        
    
    service.eval = function(test){
        return 1;
    };  
    
    return service;    
})
