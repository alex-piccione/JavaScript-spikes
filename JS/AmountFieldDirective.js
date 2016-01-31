
//var app = app || angular.module("spike", []);

var config = config || {};
var waitForCalculate = config.waitForCalculate || 3.5 *1000;   // time of inactivity after which the evaluation start (milliseconds)

(function(waitForCalculate) {
app.directive("spikeAmountField", function(CalculatorService){
	var directive = {
		restrict: "E",
		//templateUrl: "inputAmountFieldTemplate.html"
		template: '<input type="text" class="form-input" placeholder="{{placeholder}}" ng-model="amount" >'
			+ ' decimal separator: {{decimalSeparator}}'	
	};
	        
	directive.scope = {
		amount: "=amount",
		placeholder: "=placeholder",
		decimalSeparator: "="        
	};
    
    directive.waitForCalculate = waitForCalculate; // time of inactivity after which the evaluation start (milliseconds)
    directive.isEvaluating = false;
    
    directive.eval = function(value, scope)
    {       
        scope.$emit("eval");
                        
        directive.isEvaluating && clearTimeout(directive.isEvaluating); // stop evaluating				
                        
        // contains something different from digits or decimal separator?
        if ((value+"").match(/[^\d,.]/g))
        {	            
            scope.$emit("evaluate", {text: value});
            
            directive.isEvaluating = setTimeout( function()
            {                     
                var valueResult = null;
                try 
                {                        
                    alert(scope.decimalSeparator);
                    valueResult = CalculatorService.eval(value, scope.decimalSeparator); 

                    scope.amount = valueResult;	
                    scope.$apply(); // or use $timeout()
                }
                catch(error)
                {							
                    console.log("Error on evaluating \"" + value + "\". " + error);
                }
            }, waitForCalculate);	
        };
    };
    
	directive.link = function(scope, element, attr)
    {
        if(!attr.amount) throw Error('"amount" attribute is missing.');       
      
        // scope is not directive.scope;

		scope.$watch( function(scope_) {return scope_.amount}, function(newValue, oldValue){  
console.log("amount: " + newValue);
			 if(newValue !== oldValue)
                directive.eval(newValue, scope);		
		})	
         
        var field = element.find("input");

		$(field).on("keyup", function(event){	
console.log("keyup: " + event.keyCode);
			if(event.keyCode == 13) // return
                directive.eval( field.val(), directive.scope);
        });	
			
	};
	
	return directive;
})
})(waitForCalculate);
