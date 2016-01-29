describe("Service: CalculatorService", function(){
 
    var service;
    
    beforeEach(inject( function(CalculatorService){
        service = CalculatorService;
    }));
    
    beforeEach(function(){
        //..
    });
    
    it("should exists", function(){        
        expect(service).toBeDefined();
    });    
        
    describe("this.eval()", function(){
        
        it("should exists", function(){
            expect(service.eval).toBeDefined();            
        });      
        
        helper.executeTestCases({            
            description: 'given the value #value should return "#result"',
            test: function(value, result){
                expect(service.eval(value)).toEqual(result);                
            },
            cases: [
                  { value: 1, result: "1"}
                , { value: 1.23, result: "1.23"}
                // todo: add tests
            ]
        });
        
        helper.executeTestCases({            
            description: 'given the value #value and the decimals separator #sep should return "#result"',
            test: function(value, sep, result){
                expect(service.eval(value, sep)).toEqual(result);                
            },
            cases: [
                  { input: "1+2", sep: ".", result: "3"}
                , { input: "10-3", sep: ".", result: "7"}
                , { input: "123+2", sep: ".", result: "125"}                
            ]
        });
            
    });           

    describe("* Internal Functions *", function(){
        
        describe("recognizeValues()", function(){
            
            it("should exists", function(){
                expect(service.this.recognizeValues).toBeDefined();                
            });
            
            helper.executeTestCases({
                description: 'given the input "#input" should return "[#result]"',
                test: function(input, result){
                    var values = service.this.recognizeValues(input);
                    expect(values).toEqual(result);
                },
                cases: [
                    { input: 1, result:[1]}
                ]
            });
            
        });
        
    });
    
});