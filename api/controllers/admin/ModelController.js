/**
 * Admin/modelController
 *
 * @description :: Server-side logic for managing admin/models
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function getModelConfig(Model) {
  var modelName = Model.adapter.collection;
  var config = sails.config.admin.models;
  var modelConfig = config[modelName] === undefined ? {} : config[modelName];
  var generalConfig = config.general || {};

  if (modelConfig === false) {
    return null;
  }

  var modelAttrs = [];

  if (_.isPlainObject(modelConfig) && Array.isArray(modelConfig.order)) {
    modelAttrs = _.intersection(modelConfig.order, Object.getOwnPropertyNames(Model.attributes));
  } else {
    modelAttrs = Object.getOwnPropertyNames(Model.attributes);
  }

  modelAttrs = modelAttrs.map(function(attrName) {
    var attrVisibility = reduceAttrVisibility(
      generalConfig[attrName],
      modelConfig === 'read' ? 'read' : modelConfig[attrName]);

    if (attrVisibility === false) {
      return null;
    }

    var attr = {
      name: attrName,
      readonly: attrVisibility === 'read',
      type: normalizeAttrType(Model.attributes[attrName])
    };

    if (attr.type == 'enum') {
      attr.options = Model.attributes[attrName].enum;
    }

    return attr;
  });

  modelAttrs = _.compact(modelAttrs)

  return {
    name: modelName,
    attrs: modelAttrs
  };
}

function reduceAttrVisibility(globalVisibility, localVisibility) {
  if (localVisibility === true || localVisibility === false || localVisibility === 'read') {
    return localVisibility;
  }

  if (globalVisibility === true || globalVisibility === false || globalVisibility === 'read') {
    return globalVisibility;
  }

  return true;
}

function normalizeAttrType(sailsAttr) {
  if (typeof sailsAttr == 'string') {
    return sailsAttr;
  } else if (sailsAttr.hasOwnProperty('model')) {
    return 'model';
  } else if (sailsAttr.hasOwnProperty('collection')) {
    return 'collection';
  } else if (sailsAttr.hasOwnProperty('enum')) {
    return 'enum';
  } else if (sailsAttr.hasOwnProperty('type')){
    return sailsAttr.type;
  } else {
    return 'string';
  }
}

function cleanHtmlFormParams(params) {
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      var pVal = params[param];
      if (typeof pVal === 'string') {
        pVal = pVal.trim();
        if (pVal === '') {
          pVal = null
        }
        params[param] = pVal;
      }
    }
  }
  return params;
}

module.exports = {
  index: function(req, res) {
    return res.view('admin/index', {
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
          res.view('admin/list', {
            models: Object.getOwnPropertyNames(sails.models),
            list: list,
            pages: pages,
            page: page,
            limit: limit,
            model: getModelConfig(Model)
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
    var id = req.param('id');

    Model.findOne(id).populateAll()
      .then(function(model) {
        var modelConfig = getModelConfig(Model);
        modelConfig.attrs.forEach(function(attr) {
          attr.value = model.hasOwnProperty(attr.name) ? model[attr.name] : undefined;
        });
        sails.log.info(modelConfig);
        modelConfig.id = id;
        res.view('admin/edit', {
          models: Object.getOwnPropertyNames(sails.models),
          model: modelConfig,
          action: 'update'
        });
      })
      .catch(function(err) {
        res.serverError(err);
      });
  },

  new: function(req, res) {
    var modelName = req.param('model').toLowerCase();
    var Model = sails.models[modelName];
    if (!Model) {
      return res.notFound();
    }

    res.view('admin/edit', {
      models: Object.getOwnPropertyNames(sails.models),
      model: getModelConfig(Model),
      action: 'create'
    });
  },

  create: function(req, res) {
    var modelName = req.param('model').toLowerCase();
    var Model = sails.models[modelName];
    if (!Model) {
      return res.notFound();
    }

    var params = req.allParams();
    delete params.id;

    var params = cleanHtmlFormParams(params);

    Model.create(params)
      .then(function(model) {
        res.redirect('/admin/' + modelName + '/' + model.id);
      })
      .catch(function(err) {
        var _err = err.toJSON();
        if (_err.error === 'E_VALIDATION') {
          var modelConfig = getModelConfig(Model);
          modelConfig.attrs.forEach(function(attr) {
            attr.value = params.hasOwnProperty(attr.name) ? params[attr.name] : undefined;
          });
          res.view('admin/edit', {
            models: Object.getOwnPropertyNames(sails.models),
            model: modelConfig,
            action: 'create',
            error: _err
          });
        } else {
          res.serverError(err);
        }
      });
  },

  update: function(req, res) {
    var modelName = req.param('model').toLowerCase();
    var Model = sails.models[modelName];
    if (!Model) {
      return res.notFound();
    }

    var id = req.param('id');
    var params = req.allParams();
    delete params.id;
    var params = cleanHtmlFormParams(params);
    Model.update(id, params)
      .then(function(model) {
        res.redirect('/admin/' + modelName + '/' + model[0].id);
      })
      .catch(function(err) {
        var _err = err.toJSON();
        if (_err.error === 'E_VALIDATION') {
          var modelConfig = getModelConfig(Model);
          modelConfig.attrs.forEach(function(attr) {
            attr.value = params.hasOwnProperty(attr.name) ? params[attr.name] : undefined;
          });
          res.view('admin/edit', {
            models: Object.getOwnPropertyNames(sails.models),
            model: modelConfig,
            action: 'update',
            error: _err
          });
        } else {
          res.serverError(err);
        }
      });
  }

};

