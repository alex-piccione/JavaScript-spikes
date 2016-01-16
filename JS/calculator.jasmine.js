

describe("Calculator", function(){

    var calculator;

    beforeEach(function(){
        calculator = new Calculator();    
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

        it("given the array [\"a\", \"b\", \"c\"] shuld return true for value \"b\"", function(){
            var a = ["a", "b", "c"];
            expect(a.contains("b")).toBe(true);            
        });
        
        it("given the array [\"a\", \"b\", \"c\"] shuld return false for value \"d\"", function(){
            var a = ["a", "b", "c"];
            expect(a.contains("d")).toBe(false);            
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
    

    describe("sum()", function(){

        it("should be able to sum two numbers", function(){     
            var a = 3;
            var b = 5;
            var expectedResult = 8;      
            var result = calculator.sum(a, b);      
            expect(result).toBe(expectedResult);        
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
    

  
});
