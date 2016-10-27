'use strict';

describe('App factory', function() {
    var PokeStore;
      
    // Before each test load our api.users module
      beforeEach(module('pokedexAppApp'));

      // Before each test set our injected Pokemons factory (_Pokemons_) to our local getAll variable
      beforeEach(inject(function(_PokeStore_) {
        PokeStore = _PokeStore_;
      }));

      // A simple test to verify the Users factory exists
      it('should exist', function() {
        expect(PokeStore).toBeDefined();
      });
});