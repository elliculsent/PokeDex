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
  .directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src !== attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      };
  });