
/* helper */

beforeEach(function () {  
 
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });  
  
});


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
  
  })
  
});
