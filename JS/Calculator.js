
// Immediately Invoked Function Expression (IIFE)
// ref: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

function Calculator(){
    
    this.operators = ["+", "-", "*", "/"];
    
    /*return {
         
    };*/
};


Calculator.prototype.sum = function(n1, n2){
    
    return n1+n2;
};


Array.prototype.any = function(values){    
    
    if(values === undefined)
        return false;
    
    if(values === undefined || !values.hasOwnProperty("length"))
        values = [values];  
    
    for(var i in values)
    {
        if(this.indexOf(values[i]) >= 0)
            return true;        
    }
    /*
    var _a = this;
    values.forEach(function(e){
        console.log(_a.indexOf(e));
        
        //if _a.some(function(_e,i,array){return _e == e})
        
        if (_a.indexOf(e) >= 0) {
            console.log("true");
            return true;        
        }
    });*/
    
    console.log("false");
    return false;
    /*
    var _array = this;
    values.forEach(function(eToFind){
        _array.forEach(function(e){
            if(e === eToFind)
                return true;            
        });        
    });
    return false;
    */
}

Calculator.prototype.recognizeValues = function(text){
    var startValues = text.toString().split(" ");
    var values = [];    
   
    
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