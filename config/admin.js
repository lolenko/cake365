module.exports.admin = {

  models: {
    general: {
      createdAt: 'read',
      updatedAt: 'read',
      id: false
    },

    order: [
      {
        title: 'жопс',
        list: [
          'user',
          'comment'
        ]
      }
    ]
  }

};
