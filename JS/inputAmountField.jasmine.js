// see here:
// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html
// https://www.google.it/webhp?client=aff-maxthon-maxthon4&channel=t38&gws_rd=cr,ssl&ei=izAYVqOWOeHqyQO3rb2oBA#channel=t38&q=jasmine+test+element+is+found



describe("SpikeAmountField", function() {
   
    var html;  
    var $compile;
    var $rootScope; 
    
      
    
    function compileElement(html, $compile, $rootScope, onEvaluate) {
        
        $rootScope.$on("evaluate", function(){
            alert(1);
            onEvaluate && onEvaluate();                
        });
        
        var element = $compile(html)($rootScope);
        $rootScope.$digest();
            
        //var result = element.text();
        var result = element.html();
        return result;    
    }; 
    
    function compileElement_2(html, $compile, $rootScope, onEvaluate) {
        
        $rootScope.$on("evaluate", function(){
            alert(1);
            onEvaluate && onEvaluate();                
        });
        
        var element = $compile(html)($rootScope);
        $rootScope.$digest();
        return element;
    }; 
     
        
    function checkValueAfterAWhile(html, input, expectedValue, done){
        var element = $compile(html)($rootScope);  
        element.val(input);                         
                
        setTimeout(function(){
            expect(element).toHaveValue(expectedValue);
            done();
        }, waitForCalculate + 50);  

    };
         

    beforeEach(function(){
            
        html = "<div>Amount: <spike-amount-field></div>";   // default
        html = "<div>Amount: <spike:amount-field placeholder=\"0.00\" decimal-separator=\"'.'\" thousand-separator=\".\" amount=\"amountValue\" ></spike:amount-field></div>";
        
    });	      
  
       
    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
        // the injector unwraps the underscore (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;	        
        //$rootScope = _$rootScope_.$new();
    }));

    
    describe("when Angular compile", function(){  
        
        
        it("<input> element should be rendered", function(){       
            var resultHtml = compileElement(html, $compile, $rootScope);
            expect(resultHtml).toContain("<input");        
        });
        
        it("\"placeholder\" attribute should be rendered", function(){
            var resultHtml = compileElement(html, $compile, $rootScope);    
            expect(resultHtml).toContain("placeholder=");            
        });
        
    });
    
    describe("after some time from the last input", function(){
        
        it("should call calculate()", function(done){
            spyOn($rootScope, "$emit");
            
            var onEvaluate = function(){
                alert("evaluate");                
            };            
                
            var element = compileElement_2(html, $compile, $rootScope, onEvaluate);
            
            // children() is necessari because directive does not use "replace" 
            // (children() works also with "replace" but not for directive inside other directive )
            var scope = element.children().isolateScope(); 
 console.log(scope);
            
            // http://www.sitepoint.com/angular-testing-tips-testing-directives/
            
            scope.amount = 1.23;
            $rootScope.$digest();
                   
            setTimeout(function(){
                expect($rootScope.$emit).toHaveBeenCalled();    
                done();
            }, waitForCalculate + 50); // extra 50 millis
            
            
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
        
    // todo: temporary hidden
    xdescribe("when the input is a sum of two integers (123+2)", function(){
            
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
