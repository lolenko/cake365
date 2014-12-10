/**
* Recipe.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      size: 150,
      maxLength: 150,
      required: true
    },
    description: {
      type: 'string',
      size: 1000,
      maxLength: 1000
    },
    author: {
      model: 'user',
      required: true
    },
    ingredients: {
      collection: 'ingredient',
      required: true,
      minLength: 1
    },
    prepTime: {
      type: 'integer',
      min: 0,
      required: true
    },
    cookTime: {
      type: 'integer',
      min: 0,
      required: true
    }
  }
};

