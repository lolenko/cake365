/**
 * IngredientController
 *
 * @description :: Server-side logic for managing ingredients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var Crawler = require("crawler");

module.exports = {
  grab: function() {
    var c = new Crawler({
      forceUTF8: true,
      maxConnections : 10,
      callback : function (error, result, $) {
        var ingredients = [];
        $('#maincontent tr').each(function(i , el) {
          var ingredient = [];
          $('td', el).each(function(i, el) {
            ingredient.push($(el).text())
          });
          ingredient.length === 6 && Ingredient.create({
            title: ingredient[0],
            water: parseFloat(ingredient[1]),
            protein: parseFloat(ingredient[2]),
            fat: parseFloat(ingredient[3]),
            carbohydrate: parseFloat(ingredient[4]),
            energy: parseFloat(ingredient[5])
          }, function(err, cur) {
            sails.log.info(arguments);
          });
        });

/*
        $('a').each(function(index, a) {
          var toQueueUrl = $(a).attr('href');
          c.queue(toQueueUrl);
        });
*/
      }
    });

    c.queue('http://www.missfit.ru/diet/table-calory/');
  }
};

