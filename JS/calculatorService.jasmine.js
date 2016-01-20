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
    });
    
    
    describe("this.parse()", function(){
        it("should exists", function(){
            expect(service.this.parse).toBeDefined();            
        }); 
        
        helper.executeTestCases({
            description: 'given the text "#text should return #result"',
            test: function(text, result){
                expect(service.this.parse(text)).toEqual(result);
            },
            cases: [
                  {text: "1.23", result: 1.23}
                , {text: " 1.23 ", result: 1.23}                
            ]
        });  
        
        helper.executeTestCases({
            description: 'given the text "#text and the decimals separator "#sep" should return #result"',
            test: function(text, sep, result){
                expect(service.this.parse(text, sep)).toEqual(result);
            },
            cases: [
                  {text: "1.23", sep: ".", result: 1.23}                  
                , {text: " 1.23 ", sep: ".", result: 1.23}        
                , {text: "1,23", sep: ",", result: 1.23}
                , {text: " 1,23 ", sep: ",", result: 1.23}
                // todo: add tests
            ]
        });       
    });
        
        
    describe("this.render()", function(){
        it("should exists", function(){
            expect(service.this.render).toBeDefined();            
        });      
        
        helper.executeTestCases({            
            description: 'given the value #value and the decimals separator #sep should return "#result"',
            test: function(value, sep, result){
                expect(service.this.render(value, sep)).toEqual(result);                
            },
            cases: [
                  { value: 1, sep:".", result: "1"}
                , { value: 1.23, sep:".", result: "1.23"}
                // todo: add tests
            ]
        });
    });
           
    
});