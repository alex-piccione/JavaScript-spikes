function Calculator(params){
    
    params = params || {};
    params.decimalSeparator = params.decimalSeparator || "."; 
    
    this.operators = ["+", "-", "*", "/"];
    this.decimalSeparator = params.decimalSeparator;   

};

Calculator.prototype.sum = function(n1, n2) {    
    return n1+n2;
};

Calculator.prototype.subtract = function(n1, n2) {    
    return n1-n2;
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
    
    var values = [];   

    var currentValue = null;
    for(var i in text)
    {
        var char = text[i];
          
        if(char == " ") { 
            if(currentValue != null) values.push(currentValue);  
            currentValue = null;    
        }
        else if(this.operators.contains(char)) {
            if(currentValue != null) values.push(currentValue);  
            currentValue = null; 
            values.push(char);
        }
        else if(char == this.decimalSeparator || /\d/.test(char) ) {            
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

Calculator.prototype.calculate = function(text){
    
    var values = this.recognizeValues(text);
    var n1, n2, operator;
    
    while(values.length > 1)
    {
        n1 = parseFloat(values[0]);
        n2 = parseFloat(values[2]);
        operator = values[1];
               
        var operationToDo = null;
        switch (operator) {
            case "+": operationToDo = this.sum; break;
            case "-": operationToDo = this.subtract; break;
            default: throw new Error('Unknown or unhandled operator: "' + operator + '".');
        }

        values = values.splice(2); // remove first 2 values
        values[0] = operationToDo(n1, n2);
    }        
        
    return parseFloat(values[0]);
};


// inspired by: http://mathjs.org/examples/browser/custom_separators.html.html

Calculator.prototype.parse = function(text, decimalSeparator){
    // replace the custom separators in the input with the default separators
    var argsSeparator = ";";
    return parseFloat(
        text
        .replace(new RegExp('\\' + decimalSeparator + '|\\' + argsSeparator, 'g'), function (match) {
          return match == decimalSeparator ? '.': ',';
        })
    );    
};

Calculator.prototype.render = function(value, decimalSeparator){
    // replace the default separators in the output with custom separators
    var argsSeparator = ";";
    return value.toString()
        .replace(new RegExp(',|\\.', 'g'), function (match) {
          return match == '.' ? decimalSeparator : argsSeparator;
        });    
};