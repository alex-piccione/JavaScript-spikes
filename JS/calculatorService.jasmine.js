describe("Service: CalculatorService", function(){
    
    var service;
    
    beforeEach(inject( function(CalculatorService){
        service = CalculatorService;
    }));
    
    beforeEach(function(){
        
    });
    
    it("should exists", function(){        
        expect(service).toBeDefined();
    });
    
    describe("eval()", function(){
        it("should exists", function(){
            expect(service.eval).toBeDefined();            
        });    
        
        helper.executeTestCases({
            
            description: 'when input is #input and decimals separator is "#sep" result should be #result',
            test: function(input, sep, result){
                expect(service.eval(input, sep)).toEqual(result);
            },
            cases: [
                  { input: "1+2", sep: ".", result: "3"}
                , { input: "10-3", sep: ".", result: "7"}
                , { input: "123+2", sep: ".", result: "125"}                
            ]
        });
            
    });
    
});