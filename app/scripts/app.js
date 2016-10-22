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
  .module('pokedexAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
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
