app.directive("spikeAmountField", function(){
	var directive = {
		restrict: "E",
		//templateUrl: "inputAmountFieldTemplate.html"
		template: '<input id="{{id}}" type="text" class="form-input" placeholder="{{placeholder}}" __value="{{amount}}" ng-model="amount" >'
			+ ' decimal separator: {{decimalSeparator}}'		
	};
	
	directive.scope = {
		amount: "=amount",
		placeholder: "=placeholder",
		decimalSeparator: "="
	};
	
	directive.link = function(scope, element, attr){
		scope.id = "spikeAmountField_" + Math.floor(Math.random()*1000000);
		//console.log(scope.id);

		//var field = element.find("#" + scope.id);
		var isEvaluating = null;
		scope.$watch( function(scope) {return scope.amount}, function(newValue, oldValue){
			if(newValue !== oldValue)
			{
				console.log("newValue > " + newValue);
				
				isEvaluating && clearTimeout(isEvaluating); // stop evaluating
				
				
				// normalize to JavaScript (en) locale
				var normalizedText = (newValue+ "").replace(scope.decimalSeparator, ".");
				//console.log("normalized: " + normalizedText);
				// contains somethin different from numbers or decimal separator?
				if (normalizedText.match(/[^\d.]/g))
				{	
					isEvaluating = setTimeout( function(){
					
						var valueResult = null;
						try 
						{
							console.log("evaluate " + normalizedText);
							valueResult = eval(normalizedText); 
							console.log("amount = " + valueResult);
							scope.amount = valueResult;	
						}
						catch(error)
						{
							//valueResult = 		normalizedText + " (cannot evaluate)";		
							console.log("cannot evaluate \"" + normalizedText + "\".");
						}
					}, 1000*1);	
					//scope.amount = 
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
});