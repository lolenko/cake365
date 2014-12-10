/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  types: {
    isPath: function(path) {
      // TODO
      return true;
    }
  },

  attributes: {
    text: {
      type: 'string',
      maxLength: 500,
      size: 500,
      required: true
    },
    author: {
      model: 'user',
      required: true
    },
    rating: {
      type: 'integer',
      defaultTo: 0
    },
    parent: {
      type: 'integer',
      required: true
    },
    path: {
      type: 'integer',
      isPath: true
    }
  }
};

