
// https://docs.angularjs.org/guide/unit-testing

describe("inputAmountField", function(){
	
	var $compile;
	var $rootScope;
	
	//load the app that contains the directive
	app = angular.module("test", [])
	beforeEach(angular.module("test"));
	
	var html; // container
	var inputFieldAmount;
	
	
	beforeEach(function(){
		
		html = "<spikeAmountField>";
		// store refe
	});
	
	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
		// the injector unwraps the underscore (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		
	}));
	
	
	it("render without errors", function(){
		console.log(html);
		var element = $compile(html)($rootScope);
		$rootScope.$digest();
		
		var result = element.text();
		result = element.html();
		
		console.log(result);
		
		expect(result).toContain("<input>");
	});
	
	
});