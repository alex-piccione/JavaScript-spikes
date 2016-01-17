
//var app = app || angular.module("spike", []);

var config = config || {};
var waitForCalculate = config.waitForCalculate || 500;   // time of inactivity after while the evaluation start (milliseconds)

(function(waitForCalculate) {
app.directive("spikeAmountField", function(){
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
    
    directive.waitForCalculate = waitForCalculate; // time of inactivity after while the evaluation start (milliseconds)
    
	directive.link = function(scope, element, attr){
		//scope.id = "spikeAmountField_" + Math.floor(Math.random()*1000000);
		//scope.$emit("evaluate");
        //alert("$emit evaluate");
        
		var isEvaluating = null;
		scope.$watch( function(scope_) {return scope_.amount}, function(newValue, oldValue){            
            
			if(newValue !== oldValue)
			{
console.log("newValue: " + newValue);
                scope.$emit("amount changed");
                				
				isEvaluating && clearTimeout(isEvaluating); // stop evaluating				
				
				// normalize to JavaScript (en) locale
				var normalizedText = (newValue+"").replace(scope.decimalSeparator, ".");
				// contains something different from digits or decimal separator?
				if (normalizedText.match(/[^\d.]/g))
				{	
					isEvaluating = setTimeout( function(){
					
                        scope.$emit("evaluate");
alert("$emit evaluate");
                    
						var valueResult = null;
						try 
						{
console.log("evaluate " + normalizedText);
							valueResult = eval(normalizedText); 
console.log("amount = " + valueResult);
							scope.amount = valueResult;	
							scope.$apply(); // or use $timeout()
						}
						catch(error)
						{							
							console.log("cannot evaluate \"" + normalizedText + "\".");
						}
					}, waitForCalculate);	
				}
				
			}
		
		})
		/*
		//element.on("keyup", function(event){
		$(field).on("keyup", function(event){
			var field = element.find("#" + scope.id);
			
			console.log(event.keyCode);
			
			//var char_ = event.keyCode;
			if(event.keyCode == 13) // return
			{
				var amount = eval(field.val());
				scope.amount = amount;				
			}		
			//else
			//	scope.evaluate();
			
			//console.log(field.val());
			
			//var operators = ['+', '-', 'x', '÷'];	
		});	
		*/		
	};
	
	return directive;
})
})(waitForCalculate);
