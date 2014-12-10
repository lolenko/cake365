/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      enum: ['root', 'admin', 'moderator', 'user'],
      protected: true
    },
    birthday: {
      type: 'date'
    },
    sex: {
      type: 'string',
      enum: ['m', 'f']
    }
  }
};

