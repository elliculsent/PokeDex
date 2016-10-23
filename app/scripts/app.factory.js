'use strict';

/**
 * @ngdoc overview
 * @name pokedexAppApp
 * @description
 * # pokedexAppApp
 *
<<<<<<< HEAD
 * Main module of the application.
=======
 * Factory for getting JSON data/db request.
>>>>>>> dev_branch
 */
angular
  .module('pokedexAppApp')
  .factory('PokeStore', function($http){
    return {
      getAll: function(callback){
        $http.get('../data/pokedex.json').success(callback);
      },
<<<<<<< HEAD

      getTypes:  function(callback){
        $http.get('../data/types.json').success(callback);
=======
      getTypes:  function(callback){
        $http.get('../data/types.json').success(callback);
      },
      getSkills:  function(callback){
        $http.get('../data/skills.json').success(callback);
>>>>>>> dev_branch
      }
    };
  });