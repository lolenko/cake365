/**
* Media.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    type: {
      type: 'string',
      enum: ['video', 'audio', 'image'],
      required: true
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    author: {
      model: 'user',
      required: true
    }
  }
};

