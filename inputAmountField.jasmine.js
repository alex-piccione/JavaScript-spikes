
describe("inputAmountField directive", function(){
	var $compile;
  
	beforeEach(module("spike_module"));
  
  beforeEach(inject(function(_$compile_){
    $compile = _$compile_;
  }));
	
	describe("Template", function(){
		
		it("render <input>", function()
		{
			var template = "<inputAmountField decimalSeparator=','>";
      
      var element = angular.element(template);
      var a = element.find("pippo");
      console.log(a);
      expect(a).not.toBeNull();
			var form = $compile(template);
			//var input = form.find("input");
			
			//expect(input).not.beNull();
			
		});
		
	});
	
});


/*
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
*/