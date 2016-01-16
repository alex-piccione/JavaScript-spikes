

describe("Calculator", function(){

    var calculator;    
    
    var helper = (function Helper(){          
        var calculator;          
        return {
            testCalculate: function(text, expectedResult, params){
                calculator = new Calculator(params);
                var result = calculator.calculate(text);
                expect(result).toEqual(expectedResult);
            },
            
            executeTestCases: function(testCases) {
                var helper = this;
                testCases.forEach(function(element) {
                    it('given the text "' + element.text + '" shuld return ' + element.expectedResult, function(){
                        helper.testCalculate(element.text, element.expectedResult, element.params);                    
                    });
                }, this);
            },
            
            
            createDescription: function(params, testValues){
                var description = params.testDescription;                     
                
                var placeHolders = params.testDescription.match(/(#\w+)/g);
                if(!placeHolders) throw Error("Fail to recognize placeHolders in test description (" + description + ").");
                placeHolders.forEach(function(element, index){
                    var replaceValue = testValues[index];
                    description = description.replace(element, replaceValue);                    
                });    
                return description;
            },
            
            // ispiration: https://github.com/desirable-objects/neckbeard.js/blob/master/src/neckbeard.js
            executeTest: function(params){
                var helper = this;
                params.testCases.forEach(function(testCase){
                    var description = helper.createDescription(params, testCase);                                        

                    return it(description, function(){
                        //params.testFunction(testCase);
                        params.testFunction(testCase[0], testCase[1], testCase[2]);
                    });                    
                   
                });
            }     
            
        };
    })();    
   

    beforeEach(function(){
         calculator = new Calculator(null);
    });
    
    
    describe("Array.any()", function(){
        
        it("should exists", function(){
            var a = [];
            expect(a.any).toBeDefined();            
        });
        
        it("given the array \"[1,2,5,6]\" should return true for \"2\"", function(){
            var array = [1,2,5,6];                        
            expect(array.any(2)).toBe(true);
        });
        
        it("given the array \"[1,2,5,6]\" should return false for \"3\"", function(){
            var array = [1,2,5,6];                        
            expect(array.any(3)).toBe(false);
        });
                
        
    });
    
    describe("Array.contains()", function(){        
       
        it("should exists", function(){
            var a = [];
            expect(a.contains).toBeDefined();
        });
        
        helper.executeTest( {
            testDescription: "given the array #a for the value #v should return #r",
            testCases: [
                [ ["a", "b", "c"], "b", true ],
                [ ["a", "b", "c"], "d", false ]                
            ],
            testFunction: function(array, value, expectedResult){
                expect(array.contains(value)).toBe(expectedResult);
            }            
        } );       
    });
    
    describe("when created", function(){
        
        it("should have \"operators\"", function(){
            expect(calculator.operators).toBeDefined();        
        });
        
        it("should have \"decimalSeparator\"", function(){
            expect(calculator.decimalSeparator).toBeDefined();        
        });
    });    
     
    describe("recognizeValues()", function(){      
       
       
        it("given the string \"1 + 2\" should return ['1','+','2']", function(){
            var input = "1 + 2";
            var expectedResult = ["1", "+", "2"];
            var result = calculator.recognizeValues(input);
            expect(result).toEqual(expectedResult);
        });        

        it("given the string \"1+2\" should return ['1','+','2']", function(){
            var input = "1+2";
            var expectedResult = ["1", "+", "2"];
            var result = calculator.recognizeValues(input);
            expect(result).toEqual(expectedResult);
        });
        
        it("given the string \"1.2 + 3.4\" should return ['1.2','+','3.4']", function(){
            var input = "1.2 + 3.4";
            var expectedResult = ["1.2", "+", "3.4"];
            var result = calculator.recognizeValues(input);
            expect(result).toEqual(expectedResult);
        }); 
        
    });
    
    describe("sum()", function(){

        it("should be able to sum two numbers", function(){     
            var a = 3;
            var b = 5;
            var expectedResult = 8;      
            var result = calculator.sum(a, b);      
            expect(result).toBe(expectedResult);        
        });
  
    });
    
    describe("calculate()", function(){
        
        it("should be defined", function(){
            expect(calculator.calculate).toBeDefined();            
        });
        
        describe("with default parameter", function(){
            var testCases = [
                {text:"123", expectedResult:123, params:null },
                {text:" 12.3 ", expectedResult:12.3, params:null },
                {text:"1+2", expectedResult:3, params:null }
                
            ];
            
            helper.executeTestCases(testCases);           
        });
        
    });

  
});

