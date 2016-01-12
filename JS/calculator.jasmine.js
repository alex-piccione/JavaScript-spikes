

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
  
});
