if(!app) throw Error("app is undefined here?");

var config = config || {};
var decimalSeparator = config.decimalSeparator || ".";   // numeric decimal separator character

(function(decimalSeparator){
app.service("calculatorService", function(){
    
    this.decimalSeparator = decimalSeparator;
        
        
    this.evaluate = function(expression){
        return 1;        
    };
    
})
})(decimalSeparator);


http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/