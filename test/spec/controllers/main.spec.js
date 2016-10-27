'use strict';

describe('MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pokedexAppApp'));

 var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

    it('should get the values from json files', function () {
        var $scope = {};
        var controller = $controller('MainCtrl', { $scope: $scope });
        console.log($scope);
        setTimeout(function(){  
            console.log($scope.types);
            console.log($scope.pokemons);
            console.log($scope.skills);
            
            expect($scope.types).toBeDefined();
            expect($scope.pokemons).toBeDefined();
            expect($scope.skills).toBeDefined();
        }, 10000);
    });
});
