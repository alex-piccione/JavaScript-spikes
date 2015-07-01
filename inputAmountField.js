app.directive("spikeAmountField", function(){
	var directive = {
		restrict: "E",
		//templateUrl: "inputAmountFieldTemplate.html"
		template: '<input type="text" class="form-input" placeholder="{{placeholder}}" value="{{amount}}">'
			+ ' decimal separator: {{decimalSeparator}}'		
	};
	
	directive.scope = {
		amount: "=amount",
		placeholder: "=placeholder",
		decimalSeparator: "="
	};
	
	return directive;
});