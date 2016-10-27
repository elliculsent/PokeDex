'use strict';

/**
 * @ngdoc function
 * @name pokedexAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokedexAppApp
 */
angular.module('pokedexAppApp')
  .controller('MainCtrl', function ($filter, $scope, PokeStore, $location, $routeParams) {
    
    PokeStore.getTypes(function(data) { 
        $scope.types=data;            
    });

    $scope.findElement = function (arr, propName, propValue) {
      for (var i=0; i < arr.length; i++) {
            if (arr[i][propName] === propValue){
              return arr[i];
            }
      }

      // will return undefined if not found; you could return a default instead
    };

    $scope.getDetail = function () {
        PokeStore.getSkills(function(data) {
            $scope.skills = data;
            $scope.displayPokemonDetail();
        });
    };
    
    $scope.displayPokemonDetail = function (){
        PokeStore.getAll(function(data) {
            $scope.pokemons = data;

            for(let i=0; i<data.length; i++) {
                var getType = [];

                if(data[i].id === $routeParams.id) {
                    $scope.pokemonDetail = data[i];

                    //get array of types from types.json
                    if(data[i].type.length>0) { 

                        for(let h=0; h<data[i].type.length; h++) {  
                            let value = data[i].type[h];
                            
                            for(let j=0; j<$scope.types.length; j++) {  
                                if(value===$scope.types[j].cname||value===$scope.types[j].jname) {
                                    getType.push($scope.types[j].ename);
                                    break;
                                }
                            }
                        }
                        
                        data[i].etype = getType;
                    }
                    
                    //get array of skills from skills.json
                    if(data[i].skills.level_up.length>0) {
                        var levelUpSkills = data[i].skills.level_up;
                        if(levelUpSkills.length>0) { 
                            var getSkills = [];
                            for(let h=0; h<levelUpSkills.length; h++) {  
                                let value = levelUpSkills[h];

                                var skillsData = $scope.findElement($scope.skills, "id", value);

                                var result = $.grep(getSkills, function(e){ return e.id === value; });
                                var skillType = skillsData.type;

                                //get english name of type
                                for(let j=0; j<$scope.types.length; j++) {  
                                    if(skillType===$scope.types[j].cname||skillType===$scope.types[j].jname) {
                                        skillsData.typeEname = $scope.types[j].ename;
                                        break;
                                    }
                                }

                                if (result.length === 0) {
                                    getSkills.push(skillsData);
                                }

                            }

                            data[i].levelUpSkill = getSkills;
                        }
                    }
                    
                    break;
                }
            }
        });
    };
    
    
    if($routeParams.id !== undefined) {
        $scope.displayMain = false;
        $scope.getDetail();
        
    }else {
        
        $scope.displayMain = true;
        $scope.sortingOrder = 'ename';
        $scope.reverse = false;
        $scope.sortByValue = 'Name';
        $scope.eOrderByType = '';
        $scope.newClass1 = 'btn-primary';

        $scope.pokemonData = [];
        
        PokeStore.getAll(function(data) {
            $scope.pokemons = data;

            for(let i=0; i<data.length; i++) {
                var getType = [];

                if(data[i].type.length>0) { 

                    for(let h=0; h<data[i].type.length; h++) {  
                        let value = data[i].type[h];

                        //get array of types from types.json
                        for(let j=0; j<$scope.types.length; j++) {  
                            if(value===$scope.types[j].cname||value===$scope.types[j].jname) {
                                getType.push($scope.types[j].ename);
                            }
                        }

                        data[i].etype = getType;
                    }
                }

                $scope.pokemonData.push(data[i]);
            }
            
            // functions have been describe process the data for display
            $scope.search();
        });
        
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 20;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.formData = {
            searchValue: ''
        };
        
        $scope.searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

         // init the filtered items
        $scope.search = function (value, type) {
            
            $scope.filteredItems = $filter('filter')($scope.pokemonData, function (item) {
                
                //filter by type
                if(type===1) {
                    //compare types and filter the same types
                    if(item.etype.length>0) { 

                        for(let h=0; h<item.etype.length; h++) {
                            
                            if ($scope.searchMatch(item.etype[h], value)) {
                                return true;
                            }
                            return false;
                        }
                    }
                }else {     //filter by search name
                    if ($scope.searchMatch(item.ename, value)) {
                        return true;
                    }
                    return false;
                }
            });
            
            // take care of the sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };
        
        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

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

        $scope.sortBy = function (newSortingOrder) {
            if ($scope.sortingOrder === newSortingOrder) {
                $scope.reverse = !$scope.reverse;
            }
            
            $scope.sortingOrder = newSortingOrder;

            if(newSortingOrder==='id') {
                $scope.sortByValue = 'ID'; 
            } else {  
                $scope.sortByValue = 'Name';
            }
            
            // functions have been describe process the data for display
            $scope.search();
        };

        $scope.sortOrder = function (id) {
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

        $scope.triggerChildDetails = function (id) {
            $location.path('/'+id);
        };
    }
    
  });

