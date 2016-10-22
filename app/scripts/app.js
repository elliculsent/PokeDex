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
  });
