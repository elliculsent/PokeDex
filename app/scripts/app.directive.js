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
 * Directive for replacing images with the correct one.
>>>>>>> dev_branch
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