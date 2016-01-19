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
    });
    
    // todo: add tests
    
    
    describe("this.render()", function(){
        it("should exists", function(){
            expect(service.this.render).toBeDefined();            
        });      
    });
    
    // todo: add tests
    
});