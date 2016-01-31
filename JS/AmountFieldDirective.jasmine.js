// see here:
// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html
// https://www.google.it/webhp?client=aff-maxthon-maxthon4&channel=t38&gws_rd=cr,ssl&ei=izAYVqOWOeHqyQO3rb2oBA#channel=t38&q=jasmine+test+element+is+found

// // http://www.sitepoint.com/angular-testing-tips-testing-directives/

describe("Directive: SpikeAmountField", function() {
   
    var html;  
    var $compile;
    var $rootScope;
    var controller;
    var controllerScope;
    var element;
    var scope;
    var CalculatorService;
    
    app.controller("SpikeController", function($scope) {  });
          
    //var html = "<spikeAmountField />";    // not recognized
    //var html = "<SpikeAmountField />";    // not recognized        
    //var html = "<spikeAmount-Field />";   // not recognized
     
    //var html = "<spike-amount-field />";  // ok
    //var html = "<spike:amount_field />";  // ok
          
   
    function compileElement(html) {    
 
        element = $compile(html)(controllerScope);

        // children() is needed because directive does not use "replace" 
        // (children() works also with "replace" but not for directive inside another directive)
        scope = element.children().isolateScope(); 
        
        controllerScope.$digest();      
    }; 
     
        
    function checkValueAfterAWhile(html, input, expectedValue, done){
                
//alert(customHtml);
//alert(html);   
        $compile(html)(controllerScope);  
        
        var field = element.find("input");
        if(field.length == 0) throw new Error('<input> field not found. Check element declaration syntax (es. "spike:amount-field").');
        field = $(field[0]);
        if(field.prop("tagName") !== "INPUT") throw new Error('Field is not an <input>. Field: "' + field.prop("tagName") + '".');
        
        controllerScope.amountValue = input;       
        controllerScope.$apply();
        
//alert(element.html());              
                
        setTimeout(function(){
            expect(field).toHaveValue(expectedValue);
            done();
        }, waitForCalculate + 10);  
    };   
          
      
    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, $controller, _CalculatorService_){
        // the injector unwraps the underscore (_) from around the parameter names when matching
        $compile = _$compile_;	        
        $rootScope = _$rootScope_;
        controllerScope = $rootScope.$new();
                       
        controller = $controller("SpikeController", {
            $scope: controllerScope
        });
        
        CalculatorService = _CalculatorService_;
        
        html = "<div>Amount: <spike:amount-field placeholder=\"0.00\" decimal-separator=\"'.'\" thousand-separator=\",\" amount=\"amountValue\" ></spike:amount-field></div>";
        compileElement(html);        
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
        
        it('if "amount" attribute is missing it should raise an error', function(){
                        
            html = '<spike:amount-field placeholder="0.00" decimal-separator="." />';
                                      
            var f = function(){
                $compile(html)(controllerScope);     
            };
            
            expect(f).toThrowError();
        });
        
        describe('and "decimal-separator" attibute is set as ","', function(){
            var customHtml = '<spike:amount-field amount="1" decimal-separator="," >';
                        
            it('scope.decimalSeparator should exists', function(){
                compileElement(customHtml);
                expect(scope.decimalSeparator).toBeDefined();                
            });
            
            it('scope.decimalSeparator should be ","', function(){
                compileElement(customHtml);
                expect(scope.decimalSeparator).toEqual(",");                
            });
            
        });
        
    });
        
            
    describe("when the amount change in the controller the event is propagated", function(){
        it("should be notified", function(){  
            spyOn(scope, "$emit");            
      
            controllerScope.amountValue = 1.23;
            controllerScope.$digest();
            
            expect(scope.$emit).toHaveBeenCalledWith("eval");                        
        });        
    });
    
        
    describe("when the directive amount changes and there is something to evaluate", function(){        
                
        var input = "1 + 2"; // something that must be evaluate           
                 
        it("should notify and give the value", function(done){  
            scope.$on("evaluate", function(event, data){              
               expect(data.text).toBeDefined();
               expect(data.text).toEqual(input);
               done();                
            });
                        
            scope.amount = input; 
            controllerScope.$digest();            
        });
        
        it("should call CalculatorService.eval() after some time", function(done){
            
            spyOn(CalculatorService, "eval");
            
            scope.amount = input; 
            controllerScope.$digest();  
            
            setTimeout(function(){  
                expect(CalculatorService.eval).toHaveBeenCalled();    
                done();                
            }, config.waitForCalculate+10 );           
            
        });      
        
    });
   
        
    describe("when the input is an integer (like 126)", function(){          
        
        var html = '<spike:amount-field amount="amount" />';           
        var input = 126;  
        var expectedResult = input.toString();

        it("the result should be the same integer", function(done){
            checkValueAfterAWhile(html, input, expectedResult, done); 
        });         
    });
        
        
    describe("*Integration Tests*", function() {
        
        describe("when the input is a sum of two integers (123+2)", function(){
                
            var html = "<spike-Amount-Field amount=123 >";
            var input = "123+20";
            var expectedResult = 143;

            it("the result should be 125", function(done){
                checkValueAfterAWhile(html, input, expectedResult, done);            
            }); 
                        
        });
            
        
        describe('when decimals separator is "."', function(){ 
            describe('and input is "123.45"', function(){
            
                var html = '<spike:Amount-Field decimalSeparator="." amount="123">';
                var input = "123.45";
                var expectedResult = "123.45";            

                it('the result value should be "123.45"', function(done){
                    checkValueAfterAWhile(html, input, expectedResult, done);                    
                }); 
            });

        });  
        
        describe('when decimals sparator is ","', function(){
            
            var customHtml = '<spike:Amount-Field decimalSeparator="," amount="amountValue" >';
            
            describe('and input is "123,45"', function(){
                var input = "123,45";
                var expectedResult = "123,45";
                
                it('the result value should be 123,45', function(done){
                    checkValueAfterAWhile(_html, input, expectedResult, done);
                });
            }); 
            
            describe('and input is "123,45 + 10,5"', function(){
                var input = "123,45 + 10,5";
                var expectedResult = "113,95";
                
                it('the result value should be 113,95', function(done){
                    checkValueAfterAWhile(customHtml, html, input, expectedResult, done);
                });
            });   
        });
    
    });    


});   
    


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
