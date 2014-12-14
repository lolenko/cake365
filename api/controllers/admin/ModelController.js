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

  sails.log.info(modelAttrs);

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
        var modelConfig = getModelConfig(Model);
        modelConfig.attrs.forEach(function(attr) {
          attr.value = model.hasOwnProperty(attr.name) ? model[attr.name] : undefined;
        });
        sails.log.info(modelConfig);
        res.view('pages/admin/edit', {
          models: Object.getOwnPropertyNames(sails.models),
          model: modelConfig
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

    res.view('pages/admin/edit', {
      models: Object.getOwnPropertyNames(sails.models),
      model: getModelConfig(Model)
    });
  }

};

