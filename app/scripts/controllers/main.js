'use strict';

/**
 * @ngdoc function
 * @name pokedexAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokedexAppApp
 */
angular.module('pokedexAppApp')
  .controller('MainCtrl', function ($filter, $scope, PokeStore, $timeout, $rootScope) {
    
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
    $scope.displayMain = true;
    $scope.displayDetails = false;
    
    //calls to JSON data
    PokeStore.getAll(function(data) {
        $scope.pokemons = data;

        for(let i=0; i<data.length; i++) {
            var getType = [];

            if(data[i].type.length>0) { 

                for(let h=0; h<data[i].type.length; h++) {  
                    let value = data[i].type[h];

                    if(value==='毒') {
                        getType.push('Poison');
                    }else if(value==='地上') {
                        getType.push('Ground');
                    }else if(value==='水') {
                        getType.push('Water');
                    }else if(value==='飞行') {
                        getType.push('Flying');
                    }else if(value==='虫') {
                        getType.push('Bug');
                    }else if(value==='炎') {
                        getType.push('Fire');
                    }else if(value==='电') {
                        getType.push('Electric');
                    }else if(value==='幽灵') {
                        getType.push('Ghost');
                    }else if(value==='岩石') {
                        getType.push('Rock');
                    }else if(value==='冰') {
                        getType.push('Ice');
                    }else if(value==='草') {
                        getType.push('Grass');
                    }else if(value==='恶') {
                        getType.push('Dark');
                    }else if(value==='龙') {
                        getType.push('Dragon');
                    }else if(value==='妖精') {
                        getType.push('Fairy');
                    }else if(value==='钢') {
                        getType.push('Steel');
                    }else if(value==='一般') {
                        getType.push('Normal');
                    }else if(value==='格斗') {
                        getType.push('Fighting');
                    }

                    data[i].etype = getType;
                }
            }

            //console.log(data[i]); 
            $scope.pokemonData.push(data[i]);
        }

        console.log($scope.pokemonData);
    });
    
    PokeStore.getTypes(function(data) { 
        $scope.types=data;    
        console.log(data);            
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
    };
    
    $scope.triggerChildDetails = function (id) {
        $timeout(function() {
            $rootScope.$broadcast('eventBroadcastedName');
            $scope.title = 'Some Titleasd';
        });
        
        $scope.$apply(function(){
            $scope.$broadcast('Sup');
            $scope.title = 'Some Title';
        });
        
        //$scope.$broadcast('eventBroadcastedName', {myMsg: 'hi children'});
        console.log('broadcast:', id);
    };
    
  });
console.log('passing asdrl');
 angular.module('pokedexAppApp')
     .controller('DetailCtrl', ['$scope', function ($scope) {
          console.log('passing detailCtrl');
          $scope.$watch('$parent.title', function(newValue, oldValue) {
              console.log('listen:', oldValue);
              console.log('new:', newValue);
              $scope.displayMain = false;
              $scope.displayDetails = true;
              $scope.value = 'lucille senturias';
          });
  }]);


