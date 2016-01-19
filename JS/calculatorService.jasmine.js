describe("Service: CalculatorService", function(){
    
    var service;
    
    beforeEach(inject( function(CalculatorService){
        service = CalculatorService;
    }));
    
    beforeEach(function(){
        
    });
    
    it("should exists", function(){
        
        //var calculator = calculatorService();
        expect(service).toBeDefined();
    });
    
    
    describe("parse()", function(){
        it("should exists", function(){
            expect(service.parse).toBeDefined();            
        });        
    });
    
    // todo: add tests
    
    
    describe("render()", function(){
        it("should exists", function(){
            expect(service.render).toBeDefined();            
        });        
    });
    
    // todo: add tests
    
});