/**
 * Admin/modelController
 *
 * @description :: Server-side logic for managing admin/models
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function getUserViewAttrs(Model) {
  var attrs = {};
  _.forIn(Model.attributes, function(attr, attrName) {
    attrs[attrName] = prepareAttrToView(attr);
  });
  ['id', 'createdAt', 'updatedAt'].forEach(function(val) {
    delete attrs[val];
  });
  return attrs;
}

function prepareAttrToView(attr) {
  var _attr = {};
  if (attr.hasOwnProperty('model')) {
    _attr.type = 'model';
  } else if (attr.hasOwnProperty('collection')) {
    _attr.type = 'collection';
  } else if (attr.hasOwnProperty('enum')) {
    _attr.type = 'enum';
    _attr.options = attr.enum;
  } else {
    _attr.type = typeof attr == 'string' ? attr : attr.type.toLowerCase();
  }
  return _attr;
}

module.exports = {
  index: function(req, res) {
    return res.view('pages/admin/index', {
      models: Object.getOwnPropertyNames(sails.models)
    });
  },

  list: function(req, res) {
    var modelName = req.param('model').toLowerCase();
    var Model = sails.models[modelName];
    if (!Model) {
      return res.notFound();
    }

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
            modelName: modelName
          });
        }).catch(function(err) {
          res.serverError(err);
        });
    });
  },

  edit: function(req, res) {
    var modelName = req.param('model').toLowerCase();
    var Model = sails.models[modelName];
    if (!Model) {
      return res.notFound();
    }
    var id = (req.param('id'));

    Model.findOne(id)
      .then(function(model) {
        var attributes = getUserViewAttrs(Model);
        sails.log.info(attributes);
        for (var field in attributes) {
          attributes[field].value = model.hasOwnProperty(field) ? model[field] : undefined;
        }
        res.view('pages/admin/edit', {
          models: Object.getOwnPropertyNames(sails.models),
          attributes: attributes,
          modelName: modelName
        });
      })
      .catch(function(err) {
        res.serverError(err);
      });
  }
};

