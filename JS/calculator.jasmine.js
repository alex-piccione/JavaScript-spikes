

describe("Calculator", function(){

    var calculator;    
    
    var helper = (function Helper(){          
        var calculator;  
        
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        function getParamNames(func) {
            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
            return result || [];
        };
        
        /*
        given the string "this is a #one" an the values {one:"test"} it returns "this is a test"
        */
        function createDescription(description, values){  
            var placeHolders = description.match(/(#\w+)/g);
            if(!placeHolders) throw Error("Fail to recognize placeHolders in test description (" + description + ").");
            placeHolders.forEach(function(placeHolder, index){
                var newValue = values[placeHolder.substr(1)];  // remove the "#"
                description = description.replace(placeHolder, newValue);                    
            });    
            return description;
        };
            
                
        return {
            testCalculate: function(text, expectedResult, params){
                calculator = new Calculator(params);
                var result = calculator.calculate(text);
                expect(result).toEqual(expectedResult);
            },
            
            // inspired by: https://github.com/desirable-objects/neckbeard.js/blob/master/src/neckbeard.js
            // https://github.com/FrankyBoy/jasmine-params/blob/master/lib/jparams.js
            // https://www.npmjs.com/package/jasmine-params
            executeTestCases: function(params){
                params.values.forEach( function(element, index){
                    var description = createDescription(params.description, element);                      
                                       
                    var paramNames = getParamNames(params.test);
                    var parameters = [];
                    paramNames.forEach(function(name){
                        if(!element[name]) throw new Error('Element "' + name +'" not found in row #' + index + '" of values."');
                        parameters.push(element[name]);                        
                    });
         
                    return it(description, function(){
                        params.test.apply(null, parameters);
                    });                    
                });
            },           
            
            executeTest: function(params){
                var helper = this;
                params.testCases.forEach(function(testCase){
                    var description = createDescription(params.testDescription, testCase);                                        

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
        
        helper.executeTestCases( {
            description: 'given the string "#text" should return [#result]', 
            values: [
                { text: "1 + 2",        result: ["1", "+", "2"] },
                { text: "1+2",          result: ["1", "+", "2"] },
                { text: "1.2 + 3.4",    result: ["1.2", "+", "3.4"] }               
            ],            
            test: function(text, result){
                var testResult = calculator.recognizeValues(text);
                expect(testResult).toEqual(result);    
            }
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
            
            helper.executeTestCases( {
                description: 'given the string "#text" should return #result',
                values: [
                     { text: "123",     result: 123}
                    ,{ text: " 12.3 ",  result: 12.3}                                
                ],
                test: function(text, result){
                    expect(calculator.calculate(text)).toEqual(result);
                }
            });           
        });
        
    });

  
});

