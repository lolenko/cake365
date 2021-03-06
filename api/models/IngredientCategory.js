/**
* IngredientCategory.js
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
      unique: true
    },
    // опичание
    description: {
      type: 'string'
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

