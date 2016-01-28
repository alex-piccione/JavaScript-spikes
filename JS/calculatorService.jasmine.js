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
            description: 'given the value #value should return "#result"',
            test: function(value, result){
                expect(service.this.render(value)).toEqual(result);                
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
                expect(service.this.render(value, sep)).toEqual(result);                
=======
            
            description: 'when input is #input and decimals separator is "#sep" result should be #result',
            test: function(input, sep, result){
                expect(service.eval(input, sep)).toEqual(result);
>>>>>>> .merge_file_a02780
            },
            cases: [
                  { input: "1+2", sep: ".", result: "3"}
                , { input: "10-3", sep: ".", result: "7"}
                , { input: "123+2", sep: ".", result: "125"}                
            ]
        });
            
    });
<<<<<<< .merge_file_a02196
           
    describe("eval()", function(){
        it("should exists", function(){
            expect(service.eval).toBeDefined();            
        });
        
    });
=======
>>>>>>> .merge_file_a02780
    
});