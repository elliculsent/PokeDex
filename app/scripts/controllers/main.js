'use strict';

/**
 * @ngdoc function
 * @name pokedexAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokedexAppApp
 */
angular.module('pokedexAppApp')
  .controller('MainCtrl', function ($filter, $scope, PokeStore) {
    
    // init
    //var vm = this;
    var sortingOrder = 'ename';
    $scope.sortingOrder = sortingOrder;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.pokemonData = [];
    
    
    $scope.reverse = false;
    $scope.sortByValue = 'Name';
    $scope.eOrderByType = '';
    $scope.newClass1 = 'btn-primary';
    
    //calls to JSON data
    PokeStore.getAll(function(data) {
        $scope.pokemons = data;
        
        for(let i=0; i<data.length; i++) {
            console.log(data[i]);
            $scope.pokemonData.push(data[i]);
        }
        
        console.log($scope.pokemonData);
    });
    
    PokeStore.getTypes(function(data) {
        console.log(data);
        $scope.types=data;              
    });
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
    
    $scope.sortBy = function (type) {
        $scope.sortingOrder = type;
        
        if(type==='id') {
            $scope.sortByValue = 'ID'; 
        } else {  
            $scope.sortByValue = 'Name';
        }
        
        console.log($scope.sortingOrder);
    };
    
    $scope.sortOrder = function (id) {
        console.log(id);
        $scope.reverse = (id===1)? false:true;
        
        //resetting of classes
        if(id===1) {
            $scope.newClass2 = '';
            $scope.newClass1 = 'btn-primary';
        }else {
            $scope.newClass1 = '';
            $scope.newClass2 = 'btn-primary';
        }
        
    };
    
    $scope.orderByType = function (c, j, e) {
        $scope.eOrderByType = e;
        $scope.orderByTypeValues = [c, j];
        console.log($scope.eOrderByType);
        console.log($scope.orderByTypeValues);
    };
    
    $scope.filterByTypes = function(pm) {
        var val=($scope.orderByTypeValues.indexOf(pm.type) !== -1);
        console.log(pm, val);
        return ($scope.orderByTypeValues.indexOf(pm.type) !== -1);
    };
    
    /*$scope.search = function (pokemonData) {
        
        if ($scope.type === undefined || $scope.type.length === 0) {
            return true;
        }
        
        var found = false;
        angular.forEach(pokemonData.type, function (pm) {          
            if (pm.type === parseInt($scope.type)) {
                found = true;
            }
        });
        
        return found;
    };*/
    
  });
