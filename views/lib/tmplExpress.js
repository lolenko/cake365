exports.cache = {};

exports.renderFile = function(path, options, fn){
    console.log(path);
    // support callback API
    if ('function' == typeof options) {
        fn = options, options = undefined;
    }
    if (typeof fn === 'function') {
        var res;
        try {
            res = exports.renderFile(path, options);
        } catch (ex) {
            return fn(ex);
        }
        return fn(null, res);
    }

    options = options || {};

    var key = path + ':string';

    options.filename = path;
    var page = options.cache
        ? exports.cache[key] || (exports.cache[key] = require(path))
        : require(path);
    return (new page(options)).toString();
};

exports.__express = exports.renderFile;