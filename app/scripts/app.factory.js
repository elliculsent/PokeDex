'use strict';

/**
 * @ngdoc overview
 * @name pokedexAppApp
 * @description
 * # pokedexAppApp
 *
 * Factory for getting JSON data/db request.
 */
angular
  .module('pokedexAppApp')
  .factory('PokeStore', function($http){
    return {
      getAll: function(callback){
        $http.get('../data/pokedex.json').success(callback);
      },
      getTypes:  function(callback){
        $http.get('../data/types.json').success(callback);
      },
      getSkills:  function(callback){
        $http.get('../data/skills.json').success(callback);
      }
    };
  });