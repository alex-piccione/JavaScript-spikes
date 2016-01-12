function Calculator() {

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
            
            return values;
            
            //while (values.length > 1)
            {
                if(values.length == 2)
                     throw Error("Remain 2 values to elaborate, cannot elaborate");
                
                var a = values[0];
                var b = values [2];
                
            } 
            
        }
        
	}
}