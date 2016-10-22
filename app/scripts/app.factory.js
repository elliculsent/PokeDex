'use strict';

/**
 * @ngdoc overview
 * @name pokedexAppApp
 * @description
 * # pokedexAppApp
 *
 * Factory of the application.
 */
/*angular
  .module('pokedexAppApp')
  .factory('Pokemons', Pokemons);

  Pokemons.$inject = ['$resource', '$q', '$http'];

  function Pokemons($resource, $q, $http) {
        var mobilRates = null;
    
        function LoadData() {
            var defer = $q.defer();
            $http.get('../data/pokedex.json').success(function (data) {
                mobilRates = data;
                defer.resolve();
            });
            return defer.promise;
        }

        return {
            GetData: function () { return mobilRates ; },
            LoadData:LoadData
        };
        /*var resourceUrl =  'api/fixtures/:id';
        return $resource(resourceUrl, {}, {
            'get': { method: 'GET', 
                url: '/pokedex.json',
                isArray: true,
                transformResponse: function (data) { 
                    data = angular.fromJson(data); 
                    return data;
                }
            },
            'update': { method:'PUT' },
            'fetchSports': {
                method: 'GET',
                url: 'app/entities/dummy_data/sports.json',
                isArray: false,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }*/
