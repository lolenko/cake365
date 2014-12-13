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
      required: true,
      unique: true,
      maxLength: 150
    },
    // Категория
    category: {
      model: 'IngredientCategory'
    },
    // опичание
    description: {
      type: 'string',
      maxLength: 1000
    },
    // Энергетическая ценность
    energy: {
      type: 'integer'
    },
    // углеводы
    carbohydrate: 'float',
    // белки
    protein: {
      type: 'float'
    },
    // жиры
    fat: {
      type: 'float'
    },
    // жиры
    water: {
      type: 'float'
    },
    // цена
    price: {
      type: 'integer'
    },
    // полезность
    health: {
      type: 'integer'
    },
    // картинка
    media: {
      collection: 'media'
    },
    // главная картинка
    mainImage: {
      model: 'media'
    }
  }
};

