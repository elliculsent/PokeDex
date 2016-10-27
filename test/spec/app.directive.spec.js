'use strict';

describe('App directive', function() {

      beforeEach(module('pokedexAppApp'));

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<img err-src="app/images/thm/029Nidoran.png"  src="app/images/thm/029Nidoran%E2%99%80.png" />');
            spyOn(element, 'bind').and.returnValue('error');
            scope = $rootScope;
            $compile(element)(scope);
            scope.$digest();
        }));

        it("should contain the place holder img src", function(done) {          
            setTimeout(function(){  
                console.log(element.attr('src'));
                expect(element.attr('src')).toEqual('app/images/thm/029Nidoran.png'); 
                done();
            }, 2000);
        });
});