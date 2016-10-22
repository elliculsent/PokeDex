'use strict';

/**
 * @ngdoc overview
 * @name pokedexAppApp
 * @description
 * # pokedexAppApp
 *
 * Main module of the application.
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
      }
    };
  });