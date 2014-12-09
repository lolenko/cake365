/**
* Ingredient.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // Название
    title: {
      type: 'string',
      required: true
    },
    // Категория
    category: {
      type: 'string',
      required: true
    },
    // опичание
    description: {
      type: 'string'
    },
    // Энергетическая ценность
    energy: {
      type: 'integer',
      required: true
    },
    // углеводы
    carbohydrate: {
      type: 'float',
      required: true
    },
    // белки
    protein: {
      type: 'float',
      required: true
    },
    // жиры
    fat: {
      type: 'float',
      required: true
    }
  }
};

