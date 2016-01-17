

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
            
            // inspired by: https://github.com/desirable-objects/neckbeard.js/blob/master/src/neckbeard.js
            // https://github.com/FrankyBoy/jasmine-params/blob/master/lib/jparams.js
            // https://www.npmjs.com/package/jasmine-params
            executeTestCases: function(params){
                params.values.forEach( function(element, index){
                    var description = createDescription(params.description, element);       
                    var paramNames = getParamNames(params.test);
                    var parameters = [];
                    
                    paramNames.forEach(function(name){
                        if(!element.hasOwnProperty(name)) throw new Error('Element "' + name +'" not found in row #' + (index+1) + '" of values."' + element);
                        parameters.push(element[name]);                        
                    });
         
                    return it(description, function(){
                        params.test.apply(null, parameters);
                    });                    
                });
            },            

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
        
        helper.executeTestCases({
            description: 'given the array [#array] should return #result for value #value',
            values: [
                  {array: [1,2,4,5], value: 2, result: true }
                , {array: [1,2,4,5], value: 3, result: false}
            ],
            test: function(array, value, result){
                expect(array.any(value)).toBe(result);                
            }            
        });     
        
    });
    
    describe("Array.contains()", function(){        
       
        it("should exists", function(){
            var a = [];
            expect(a.contains).toBeDefined();
        });
        
        helper.executeTestCases({
            description: 'given the array [#array] for the value "#value" should return #result',
            values: [
                 { array:["a", "b", "c"], value: "b", result: true }
                ,{ array:["a", "b", "c"], value: "d", result: false }  
            ],
            test: function(array, value, result){
                expect(array.contains(value)).toBe(result);                
            }
        });
    
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
    
    describe("subtract()", function(){

        it("should be able to subtract a number from another numbers", function(){     
            var a = 10;
            var b = 2;
            var expectedResult = 8;      
            var result = calculator.subtract(a, b);      
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
                    ,{ text: "1+2",  result: 3}
                    ,{ text: "1.11+2.22",  result: 3.33}
                    ,{ text: " 101.11   +202.22  ",  result: 303.33}
                    ,{ text: "10-1",  result: 9}
                    ,{ text: " 45.61  -  11.1",  result: 34.51}                                          
                ],
                test: function(text, result){
                    expect(calculator.calculate(text)).toEqual(result);
                }
            });           
        });
        
    });

});