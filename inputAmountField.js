app.directive("spikeAmountField", function(){
	var directive = {
		restrict: "E",
		//templateUrl: "inputAmountFieldTemplate.html"
		template: '<input type="text" class="form-input" placeholder="{{placeholder}}" value="{{amount}}" >'
			+ ' decimal separator: {{decimalSeparator}}'		
	};
	
	directive.scope = {
		amount: "=amount",
		placeholder: "=placeholder",
		decimalSeparator: "="
	};
	
	directive.link = function(scope, element, attr){
		element.on("keyup", function(event){
			alert(element.val());	
			var amount = eval(element.val());
			scope.amount = amount;
		});		
	};
	
	return directive;
});