// see here:
// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html
// https://www.google.it/webhp?client=aff-maxthon-maxthon4&channel=t38&gws_rd=cr,ssl&ei=izAYVqOWOeHqyQO3rb2oBA#channel=t38&q=jasmine+test+element+is+found



describe("Given inputAmountField directive", function() {
        
        
    describe("and it has default parameters", function(){
    
        var html;  
        var $compile;
        var $rootScope;   
        
        function checkValueAfterAWhile(html, input, expectedValue, done){
            var element = $compile(html)($rootScope);  
            element.val(input);                         
                    
            setTimeout(function(){ 
                expect(element).toHaveValue(expectedValue);
                done();
            }, 0.5*1000);  
    
        };
         
    
        beforeEach(function(){

            module("test");   // this is angular.mock.module(), not angular.module() !!!
        
            html = "<div>Amount: <inputAmountField></div>";      
        });	      
  

        /*
        beforeEach(function() {
            module("spike_module");    
            element = angular.element("<input AmountField decimalSeparator=','>");
            //element.find("input").length
            inject( function($rootScope, $compile){
            var scope = $rootScope.$new();
            $compile(element)(scope);      
            scope.$digest();      
            });
        });
        */
        
        beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
	    // the injector unwraps the underscore (_) from around the parameter names when matching
            $compile = _$compile_;
	    $rootScope = _$rootScope_;	
        }));

    
        describe("when Angular compile", function(){
            
            it("Then <input> element is rendered", function(){
                var element = $compile(html)($rootScope);           

                $rootScope.$digest();
        
                var result = element.text();
                result = element.html();            
           
                expect(result).toContain("<input");
            });
            
        });
        
        describe("when the input is an integer (123)", function(){
              
            html = "<inputAmountField>";  
            var input = 123;
            var expectedResult = input.toString();
    
            it("the result should be the same integer", function(done){
                checkValueAfterAWhile(html, input, expectedResult, done); 
            }); 
                        
        });
        
        
        describe("when the input is a sum of two integers (123+2)", function(){
              
            html = "<inputAmountField>";  
            var input = "123+2";
            var expectedResult = 125;
    
            it("the result should be 125", function(done){
                checkValueAfterAWhile(html, input, expectedResult, done);            
            }); 
                        
        });
        
      
        describe("when culture is set to \"en\" and the input is \"123.45\"", function(){
            
            html = "<inputAmountField culture=\"en\">";
            var input = "123.45";
            var expectedResult = "123.45";
            

            it("the result should be \"123.45\"", function(done){
                checkValueAfterAWhile(html, input, expectedResult, done);                    
            });  
   
        });
      
      
    });    


});   
    
   
    
/*
	

	describe("Template", function(){

		it("render <input>", function()
		{
      alert(12);
      console.log(element);
      expect(element.find("input").length).toEqual(1);      
    });
    
    it("render <input> 2", function(){
      var html = "<input AmountField decimalSeparator=','>";
      var element = angular.element(html);
      var scope = $rootScope.$new();
      alert(11);
      $compile(element)(scope);      
      scope.$digest();   
      
    });
		
		xit("", function()
		{
			var template = "<input AmountField decimalSeparator=','>";
      
     // element = angular.element(template);
      //var x = $compile(element);
      console.log(element);
      var input = element.find("input");
      var input_2 = element.find("input_2");
      
      //alert(input);
      //alert(input_2);
      console.log(input);
      console.log(input_2);
      expect(input).not.toBeNull();
      expect(input_2).not.toBeNull();
			//var form = $compile(template);
			//var input = form.find("input");
			
			//expect(input).not.beNull();
			
		});
		
	});
	
});

*/

/* custom matchers */

beforeEach(function () {
    jasmine.addMatchers({
    
        toHaveValue: function(util, customEqualityTesters){
            return {
                compare: function(input, expectedValue)
                {
                    var result = {};
                    var currentValue = input.val();
                    //result.pass = util.equals(currentValue, expectedValue, customEqualityTesters); // fail to compare 123 with "123"
                    result.pass = currentValue.toString() === expectedValue.toString();
                    if(result.pass)
                        result.message = "OK";
                    else
                        result.message = "Expected \"" + expectedValue + "\" but value is \"" + currentValue + "\"";
                        
                    return result; 
                }
            }
        }

    });
});
