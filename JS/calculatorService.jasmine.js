describe("Service: calculatorService", function(){
    
    var calculatorService;
    
    beforeEach(inject( function(_calculatorService_){
        calculatorService = _calculatorService_;        
    }));
    
    beforeEach(function(){
        
    });
    
    it("should exists", function(){
        
        //var calculator = calculatorService();
        expect(calculatorService).toBeDefined();
    });
    
    
});