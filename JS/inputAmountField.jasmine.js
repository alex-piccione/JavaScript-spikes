// see here:
// http://www.benlesh.com/2013/06/angular-js-unit-testing-directives.html
// https://www.google.it/webhp?client=aff-maxthon-maxthon4&channel=t38&gws_rd=cr,ssl&ei=izAYVqOWOeHqyQO3rb2oBA#channel=t38&q=jasmine+test+element+is+found

describe("Given inputAmountField directive", function() {
    
    describe("and it has default parameters", function(){
    
        var html;  
    	//load the app that contains the directive
        //var app = angular.module("test", [])
    
        beforeEach(function(){

            module("test");   // this is angular.mock.module(), not angular.module() !!!
        
            html = "<div>Amount: <inputAmountField></div>";      
        });	
      
        var element;
        var $compile;
        var $rootScope;
  
        //var app = angular.module("spike_module", []);

    /*
        beforeEach(function() {
            module("spike_module");    
            element = angular.element("<input AmountField decimalSeparator=','>");
            //element.find("input").length
            inject( function($rootScope, $compile){
            var scope = $rootScope.$new();
            $compile(element)(scope);      
            scope.$digest();      
            });
        });
        */
        
        beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
		    // the injector unwraps the underscore (_) from around the parameter names when matching

            $compile = _$compile_;
		    $rootScope = _$rootScope_;
	
        }));

    
        describe("When Angular compile", function(){
            
            it("Then <input> element is rendered", function(){
                var element = $compile(html)($rootScope);           

                $rootScope.$digest();
        
                var result = element.text();
                result = element.html();            
           
                expect(result).toContain("<input");
            
            });
            
        });
        
        describe("When value is set to a number (123), after 1 second", function(){
              
            html = "<inputAmountField>";  
            var amount = 123;
    
            it("Then it has value equal to 123", function(done){
                var element = $compile(html)($rootScope);  
                element.val(amount)
                var amount_2 = element.val();      
              
                setTimeout(function(){
                    alert(123);
                    expect(amount).toEqual(amount);
                    done();
                }, 1*1000);  
            
            }); 
                        
        });
      
      
    });
});
    
/*
	

	describe("Template", function(){

		it("render <input>", function()
		{
      alert(12);
      console.log(element);
      expect(element.find("input").length).toEqual(1);      
    });
    
    it("render <input> 2", function(){
      var html = "<input AmountField decimalSeparator=','>";
      var element = angular.element(html);
      var scope = $rootScope.$new();
      alert(11);
      $compile(element)(scope);      
      scope.$digest();   
      
    });
		
		xit("", function()
		{
			var template = "<input AmountField decimalSeparator=','>";
      
     // element = angular.element(template);
      //var x = $compile(element);
      console.log(element);
      var input = element.find("input");
      var input_2 = element.find("input_2");
      
      //alert(input);
      //alert(input_2);
      console.log(input);
      console.log(input_2);
      expect(input).not.toBeNull();
      expect(input_2).not.toBeNull();
			//var form = $compile(template);
			//var input = form.find("input");
			
			//expect(input).not.beNull();
			
		});
		
	});
	
});

*/

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