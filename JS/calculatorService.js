if(!app) throw Error("app is undefined here?");



/*Array.prototype.any = function(values){    
    
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
}*/

Array.prototype.contains = function(value){    
    
    if(value === undefined)
        return false;
    
    return this.indexOf(value) >= 0;
}


//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/


app.factory("CalculatorService", function(){    
    
    var operators = ["+", "-", "*", "/"];
    
           
    /**
     * Serch in the text for values and operation signs and return that list.
     * 
     * Example: for the string "10.20 + 8.5 - 0.79" it returns ["10.20", "+", "8.5", "-", "0.79"].
     * 
     * @return {Array} This is an Array of founded values and operation.
     *  
     */
    recognizeValues = function(text, decimalSeparator) {
    
        var values = [];   

        var currentValue = null;
        for(var i in text)
        {
            var char = text[i];
            
            if(char == " ") { 
                if(currentValue != null) values.push(currentValue);  
                currentValue = null;    
            }
            else if(operators.contains(char)) {
                if(currentValue != null) values.push(currentValue);  
                currentValue = null; 
                values.push(char);
            }
            else if(char == decimalSeparator || /\d/.test(char) ) {            
                if(currentValue == null) 
                    currentValue = char;
                else 
                    currentValue += char;    
                if(i == text.length-1) values.push(currentValue);        
            }
            else {
                //console.log("invalid: " + char + "("+ char.charCodeAt(0) +")");
                throw Error("Invalid character: \"" + char + "\".");            
            }                     
        }
        
        return values;
    };
    
    sum = function(n1, n2) {    
        return n1+n2;
    };

    subtract = function(n1, n2) {    
        return n1-n2;
    };

    
    parseValue = function(input, decimalSeparator){
        var value = input.replace(decimalSeparator, ".");
        try {
            return parseFloat(value);
        }
        catch (e) {
            throw Error('Fail to parse input "'+ input +'".');            
        }        
    };
    
    // ------------------------------------------------------------------------

    var service = {};
    
    service.this = this;   // expse internal implementation hidden by closure
        
    /**
     * Evaluates the given expression and return the result.
     * It uses the given decimals separator to evaluate and to format the result.
     */
    service.eval = function(text, decimalSeparator){
        var values = recognizeValues(text);
        var n1, n2, operator;
    
        while(values.length > 1)
        {
            n1 = parseValue(values[0]);
            n2 = parseValue(values[2]);
            operator = values[1];
                
            var operationToDo = null;
            switch (operator) {
                case "+": operationToDo = sum; break;
                case "-": operationToDo = subtract; break;
                default: throw new Error('Unknown or unhandled operator: "' + operator + '".');
            }

            values = values.splice(2); // remove first 2 values
            values[0] = operationToDo(n1, n2);
        }        
            
        var resultValue = values[0].toString();
        return resultValue.replace(".", decimalSeparator);
    };  
    
    return service; 
               
})
