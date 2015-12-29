
// https://docs.angularjs.org/guide/unit-testing

var _debug = {};


describe("inputAmountField", function(){
	
	var $compile;
	var $rootScope;    
    var html; // container
       
	//load the app that contains the directive
	var app = angular.module("test", [])
    _debug.app = app;
    
    app.directive('inputAmountField', function() {
        return {
            restrict: 'E',
            replace: true,
            //template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
            template: '<input>'
        };
    });
    
    
   
	//beforeEach(angular.module("test")); 
    beforeEach(function(){
        //angular.module("test");  // this get error: ...
        module("test");    
        
        //html = "<spikeAmountField>";
		html = "<div>Amount: <inputAmountField></div>";      
    });	
		
    
	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
		// the injector unwraps the underscore (_) from around the parameter names when matching

		$compile = _$compile_;
		$rootScope = _$rootScope_;
	
	}));
	    

	
	it("render without errors", function(){        
      
		var element = $compile(html)($rootScope);

		$rootScope.$digest();

        
		var result = element.text();
		result = element.html();
		
		console.log(result);
		
		expect(result).toContain("<input");
	});
	
	
});