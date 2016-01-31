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
                  { value: "1+2", sep: ".", result: "3"}
                , { value: "10-3", sep: ".", result: "7"}
                , { value: "123+2", sep: ".", result: "125"}                
            ]
        });
            
    });           

    describe("* Internal Functions *", function(){
        
        describe("recognizeValues()", function(){
            
            it("should exists", function(){
                expect(service.this.recognizeValues).toBeDefined();                
            });
            
            it("when decimals separator is missing, should raise an error", function(){
                
                var f = function() {
                    service.this.recognizeValues("1+2" /* missing parameter */);
                };
                
                expect(f).toThrowError();            
            });
            
            helper.executeTestCases({
                description: 'given the text "#text" and the decimals separator "#sep" should return "[#result]"',
                test: function(text, sep, result){
                    var values = service.this.recognizeValues(text, sep);
                    expect(values).toEqual(result);
                },
                cases: [
                      { text: "1",      sep: ".", result:["1"]}
                    , { text: " 1",     sep: ".", result:["1"]},
                    , { text: "1+2",    sep: ".", result:["1", "+", "2"]}
                    , { text: "1+2-3",  sep: ".", result:["1", "+", "2", "-", "3"]}
                    , { text: "1.2+3",  sep: ".", result:["1.2", "+", "3"]}
                    
                    , { text: "1,2+3",  sep: ",", result:["1,2", "+", "3"]}
                    , { text: "123,45 + 10,5",  sep: ",", result:["123,45", "+", "10,5"]}
                ]
            });
            
        });
        
    });
    
});