app.directive("amountField", function(){
	var directive = {
		restrict: "E",
		//templateUrl: "inputAmountFieldTemplate.html"
		template: '<input type="text" class="form-input" placeholder="{{placeholder}}">'
	};
	
	directive.scope = {
		placeholder: "=placeholder"		
	};
	
	return directive;
});