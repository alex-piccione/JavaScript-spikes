if(!app) throw Error("app is undefined here?");

var config = config || {};
var decimalSeparator = config.decimalSeparator || ".";   // numeric decimal separator character

//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
// todo: maibe a factory is a better solution?

(function(decimalSeparator){
app.service("calculatorService", function(){    
    
    this.decimalSeparator = decimalSeparator;
        
        
    this.evaluate = function(expression){
        return 1;        
    };
    
})
})(decimalSeparator);


