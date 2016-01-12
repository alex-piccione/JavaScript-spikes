

describe("Calculator", function(){

    var calculator;

    beforeEach(function(){
        calculator  = Calculator();    
    });

    describe("sum", function() {

        it("should be able to sum two numbers", function(){     
            var a = 3;
            var b = 5;
            var expectedResult = 8;      
            var result = calculator.sum(a, b);      
            expect(result).toBe(expectedResult);        
        });
  
    });
    
    
    describe("recognizeValues", function(){
        it("given the string \"1 + 2\" should return ['1','+','2']", function(){
            var input = "1+2";
            var expectedResult = ["1", "+", "2"];
            var result = calculator.recognizeValues(input);
            expect(result).toEqual(expectedResult);
        });
        
    });
  
});
