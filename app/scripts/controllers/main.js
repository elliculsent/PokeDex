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
      for (var i=0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
          return arr[i];

      // will return undefined if not found; you could return a default instead
    };

    $scope.getDetail = function () {
        PokeStore.getSkills(function(data) {
            $scope.skills = data;
            
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
                        //console.log(data[i].skills.level_up);
                        console.log($scope.skills);
                        var levelUpSkills = data[i].skills.level_up;
                        if(levelUpSkills.length>0) { 
                            var getSkills = [];
                            for(let h=0; h<levelUpSkills.length; h++) {  
                                let value = levelUpSkills[h];

                                var skillsData = $scope.findElement($scope.skills, "id", value);
                                console.log(skillsData);

                                var result = $.grep(getSkills, function(e){ return e.id == value; });

                                if (result.length == 0) {
                                    getSkills.push(skillsData);
                                }

                                //get equivalent skills details
                                /*for(let k=0; k<$scope.skills.length; k++) {

                                    console.log(value+'==='+$scope.skills[k].id);
                                    if(value===$scope.skills[k].id) {

                                        //get english name of type
                                        /*for(let j=0; j<$scope.types.length; j++) {  
                                            if($scope.skills[k].type===$scope.types[j].cname||$scope.skills[k].type===$scope.types[j].jname) {
                                                $scope.skills[k].typeEname = $scope.types[j].ename;
                                                break;
                                            }
                                        }

                                        getSkills.push($scope.skills[k]);
                                        break;
                                        //data[i].skills.level_up[h].ename = $scope.skills[k].ename;
                                        //data[i].skills.level_up[h].ename=$scope.skills[k].ename;
                                    }
                                }*/
                            }

                            data[i].levelUpSkill = getSkills;
                        }

                        console.log(data[i]);
                        break;
                    }
                }
            });
            
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
                        }else if(value==='超能') {
                            getType.push('Psychic');
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
        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        /*$scope.items = [
        {"id":"1","name":"name 1","description":"description 1","field3":"field3 1","field4":"field4 1","field5 ":"field5 1"}, 
        {"id":"2","name":"name 2","description":"description 1","field3":"field3 2","field4":"field4 2","field5 ":"field5 2"}, 
        {"id":"3","name":"name 3","description":"description 1","field3":"field3 3","field4":"field4 3","field5 ":"field5 3"}, 
        {"id":"4","name":"name 4","description":"description 1","field3":"field3 4","field4":"field4 4","field5 ":"field5 4"}, 
        {"id":"5","name":"name 5","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
        {"id":"6","name":"name 6","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
        {"id":"7","name":"name 7","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
        {"id":"8","name":"name 8","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
        {"id":"9","name":"name 9","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
        {"id":"10","name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
        {"id":"11","name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
        {"id":"12","name":"name 12","description":"description 1","field3":"field3 12","field4":"field4 12","field5 ":"field5 12"}, 
        {"id":"13","name":"name 13","description":"description 1","field3":"field3 13","field4":"field4 13","field5 ":"field5 13"}, 
        {"id":"14","name":"name 14","description":"description 1","field3":"field3 14","field4":"field4 14","field5 ":"field5 14"}, 
        {"id":"15","name":"name 15","description":"description 1","field3":"field3 15","field4":"field4 15","field5 ":"field5 15"}, 
        {"id":"16","name":"name 16","description":"description 1","field3":"field3 16","field4":"field4 16","field5 ":"field5 16"}, 
        {"id":"17","name":"name 17","description":"description 1","field3":"field3 17","field4":"field4 17","field5 ":"field5 17"}, 
        {"id":"18","name":"name 18","description":"description 1","field3":"field3 18","field4":"field4 18","field5 ":"field5 18"}, 
        {"id":"19","name":"name 19","description":"description 1","field3":"field3 19","field4":"field4 19","field5 ":"field5 19"}, 
        {"id":"20","name":"name 20","description":"description 1","field3":"field3 20","field4":"field4 20","field5 ":"field5 20"}
    ];*/
        
        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

         // init the filtered items
        $scope.search = function () {
            
            /*$scope.filteredItems = $filter('filter')($scope.items, function (item) {
                //console.log(item);
                for(var attr in item) {
                    console.log(item[attr],  $scope.query);
                    if (searchMatch(item[attr], $scope.query))
                        return true;
                }
                return false;
            });*/
            
            $scope.filteredItems = $filter('filter')($scope.pokemonData, function (item) {
                    for(var attr in item) {
                        if (searchMatch(item[attr], $scope.searchValue)) {
                            return true;
                        }
                    }
                //});
                return false;
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

        // change sorting order
        /*$scope.sort_by = function(newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;

            // icon setup
            $('th i').each(function(){
                // icon reset
                $(this).removeClass().addClass('icon-sort');
            });
            if ($scope.reverse)
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
            else
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
        };*/

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

        $scope.orderByType = function (c, j, e) {
            $scope.eOrderByType = e;
            $scope.orderByTypeValues = [c, j];
            
            /*for(let i=0; i<$scope.pokemonData.length; i++) {
                var getType = [];
                var data = $scope.pokemonData;

                if(data[i].type.length>0) { 

                    for(let h=0; h<data[i].type.length; h++) {  
                        let value = data[i].type[h];

                        if(value==='毒'&&$scope.eOrderByType==='Poison') {
                            getType.push('Poison');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='地上'&&$scope.eOrderByType==='Ground') {
                            getType.push('Ground');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='水'&&$scope.eOrderByType==='Water') {
                            getType.push('Water');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='飞行'&&$scope.eOrderByType==='Flying') {
                            getType.push('Flying');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='虫'&&$scope.eOrderByType==='Bug') {
                            getType.push('Bug');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='炎'&&$scope.eOrderByType==='Fire') {
                            getType.push('Fire');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='电'&&$scope.eOrderByType==='Electric') {
                            getType.push('Electric');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='幽灵'&&$scope.eOrderByType==='Ghost') {
                            getType.push('Ghost');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='岩石'&&$scope.eOrderByType==='Rock') {
                            getType.push('Rock');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='冰'&&$scope.eOrderByType==='Ice') {
                            getType.push('Ice');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='草'&&$scope.eOrderByType==='Grass') {
                            getType.push('Grass');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='恶'&&$scope.eOrderByType==='Dark') {
                            getType.push('Dark');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='龙'&&$scope.eOrderByType==='Dragon') {
                            getType.push('Dragon');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='妖精'&&$scope.eOrderByType==='Fairy') {
                            getType.push('Fairy');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='钢'&&$scope.eOrderByType==='Steel') {
                            getType.push('Steel');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='一般'&&$scope.eOrderByType==='Normal') {
                            getType.push('Normal');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='格斗'&&$scope.eOrderByType==='Fighting') {
                            getType.push('Fighting');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }else if(value==='超能'&&$scope.eOrderByType==='Psychic') {
                            getType.push('Psychic');
                            data[i].etype = getType;
                            $scope.pokemonData.push(data[i]);
                        }
                    }
                }
            }*/
            
            // functions have been describe process the data for display
            $scope.search();
        };

        $scope.triggerChildDetails = function (id) {
            $location.path('/'+id);
        };
    }
    
  });

