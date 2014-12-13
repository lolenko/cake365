/**
 * Admin/modelController
 *
 * @description :: Server-side logic for managing admin/models
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    return res.view('pages/admin/index', {
      models: Object.getOwnPropertyNames(sails.models)
    });
  },

  list: function(req, res) {
    var modelName = req.param('model').toLowerCase();
    var Model;
    if (Model = sails.models[modelName]) {
      var page = parseInt(req.param('page'));
      page = isFinite(page) && page > 0 ? page : 1;

      var limit = parseInt(req.param('limit'));
      limit = isFinite(limit) && limit > 0 ? limit : 30;

      Model.count(function(err, cnt) {
        if (err) {
          return res.serverError(err);
        }

        var pages = [];
        for (var i = 0; i < Math.ceil(cnt / limit); i++) {
          pages.push({
            i: i + 1,
            active: (page == i + 1)
          })
        }
        Model.find()
          .paginate({page: page, limit: limit})
          .then(function(list) {
            res.view('pages/admin/list', {
              models: Object.getOwnPropertyNames(sails.models),
              list: list,
              pages: pages,
              page: page,
              limit: limit,
              model: modelName
            });
          }).catch(function(err) {
            res.serverError(err);
          });

      });
    } else {
      return res.notFound();
    }
  },

  edit: function(res, req) {

  }
};

