// see here:
// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html
// https://www.google.it/webhp?client=aff-maxthon-maxthon4&channel=t38&gws_rd=cr,ssl&ei=izAYVqOWOeHqyQO3rb2oBA#channel=t38&q=jasmine+test+element+is+found

// // http://www.sitepoint.com/angular-testing-tips-testing-directives/

describe("Directive: SpikeAmountField", function() {
   
    var html;  
    var $compile;
    var $rootScope;
    var element;
    var scope;
    var CalculatorService;
          
   
    function compileElement(html, $compile, $rootScope) {        
       
        element = $compile(html)($rootScope);
        
        // children() is needed because directive does not use "replace" 
        // (children() works also with "replace" but not for directive inside another directive)
        scope = element.children().isolateScope(); 
        
        $rootScope.$digest();        
    }; 
     
        
    function checkValueAfterAWhile(html, input, expectedValue, done){
        var element = $compile(html)($rootScope);  
        element.val(input);                         
                
        setTimeout(function(){
            expect(element).toHaveValue(expectedValue);
            done();
        }, waitForCalculate + 50);  
    };         
      
    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _CalculatorService_){
        // the injector unwraps the underscore (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;	        
        //$rootScope = _$rootScope_.$new();
        CalculatorService = _CalculatorService_;
        
        html = "<div>Amount: <spike:amount-field placeholder=\"0.00\" decimal-separator=\"'.'\" thousand-separator=\".\" amount=\"amountValue\" ></spike:amount-field></div>";
        compileElement(html, $compile, $rootScope);        
    }));


    
    describe("when directive was compiled", function(){  
                
        it("<input> element should be rendered", function(){       
            var resultHtml = element.html();
            expect(resultHtml).toContain("<input");        
        });
        
        it('"placeholder" attribute should be rendered', function(){
            var resultHtml = element.html(); 
            expect(resultHtml).toContain("placeholder=");            
        });
        
    });
    
    
    describe("when the rootScope.amount change the event is propagated", function(){
        it("should be notified", function(){                        
           
            spyOn(scope, "$emit");
            
            scope.amount = 1.23;
            //$rootScope.amount = 1.23;
            $rootScope.$digest();
            
            expect(scope.$emit).toHaveBeenCalled();            
        });        
    });
        
    describe("when the rootSCope.amount changes and there is something to evaluate", function(){        
                
        var input = "1 + 2"; // something that must be evaluate            
        
         
        it("should notify and give the value", function(done){  
            scope.$on("evaluate", function(event, data){              
               expect(data.text).toBeDefined();
               expect(data.text).toEqual(input);
               done();                
            });
                        
            scope.amount = input; 
            $rootScope.$digest();            
        });
        
        it("should call CalculatorService.eval() after some time", function(done){
            
            spyOn(CalculatorService, "eval");
            
            scope.amount = input; 
            $rootScope.$digest();  
            
            setTimeout(function(){  
                expect(CalculatorService.eval).toHaveBeenCalled();    
                done();                
            }, config.waitForCalculate+10 );           
            
        });      
        
    });
    
    // todo: to be implemented after class Calculator was rreplaced by service 
    xdescribe("given an input with an expression, like #expression", function(){
        describe("after some time (#time millis)", function(){
            it("should have called Calculator.calculate()", function(done){
                
                var expression = "1+2";                
                
                var calculator = {
                    calculate: function(){}                   
                };
                
                spyOn(calculator, "calculate");
                
                
                var data = compileElement(html, $compile, $rootScope);
                var element = data.element;
                var scope = data.scope;
                                
                scope.amount = expression;
                $rootScope.$digest();
                
                setTimeout(function(){
                    
                    done();
                }, config.waitForCalculate+10);                
                
                
                expect(calculator.calculate).toHaveBeenCalled();
            });            
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
        
    // todo: not yet implemented
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
        /* check if a field has the expected value. */ 
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
