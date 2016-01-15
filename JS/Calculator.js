
// Immediately Invoked Function Expression (IIFE)
// ref: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

function Calculator(params){
    
    params = params || {};
    params.decimalSeparator = params.decimalSeparator || "."; 
    
    this.operators = ["+", "-", "*", "/"];
    
    /*return {
         
    };*/
};


Calculator.prototype.sum = function(n1, n2) {    
    return n1+n2;
};


Array.prototype.any = function(values){    
    
    if(values === undefined)
        return false;
    
    if(!values.hasOwnProperty("length"))
        values = [values];  
    
    for(var i in values)
    {
        if(this.indexOf(values[i]) >= 0)
            return true;        
    }
    return false;
}

Array.prototype.contains = function(value){    
    
    if(value === undefined)
        return false;
    
    return this.indexOf(value) >= 0;
}

Calculator.prototype.recognizeValues = function(text) {
    var startValues = text.toString().split(" ");
    var values = [];       
       
    var chars = [];
    var currentValue = null;
    for(var i in text)
    {
        var char = text[i];
        chars.push(text[i]);   
        if(char == " " && currentValue != null) {
            values.push(currentValue);
            currentValue = null;            
        }
        else if(this.operators.contains(char)) {
            values.push(currentValue);  
            currentValue = null; 
            values.push(char);
        }
        else if( char == this.decimalSeparator || /\d/.test(char) ) {            
            if(currentValue == null) 
                currentValue = char;
            else 
                currentValue += char;            
        }
        else {
            throw Error("Invalid character: \"" + char + "\".");            
        }
                     
    }
    
    return values;
};

function _Calculator() {

	return {
	
		sum: function(a, b){
			return a + b;
		},
        
        divide: function(a, b){
            return a / b;            
        },
        
        subtract: function(a, b)
        {
            return a - b;            
        },
        
        
        
        calculate: function(text){
            
            var values = recognizeValues(text);
        },
        
        recognizeValues: function(text){
            var values = text.toString().split(" ");
            
            values.forEach(function(element, index) {
                var sumOperator = element.indexOf("+"); 
                if(sumOperator)
                {
                    //values = values.splice(0, sumOperator).
                    
                }    
            });
            
            
            
            if(values.length > 1)
            {
                if(values.length == 2)
                     throw Error("Remain 2 values to elaborate, cannot elaborate");
                
                var a = values[0];
                var b = values[2];
                
            } 
            
            return values;            
        }
        
	}
};