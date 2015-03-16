var Block = require('./Block');
var Element = require('./Element');
var SelfClosingElement = require('./SelfClosingElement');
var tags = require('./tags');

var React = {
    createElement: function(elName, attrs, ...children) {
        if (elName instanceof Function) {
            return new elName(attrs, children);
        } else if (typeof elName === 'string') {
            if (elName in tags) {
                if (tags[elName].isSelfClosing) {
                    return new SelfClosingElement(elName, attrs, children);
                } else {
                    return new Element(elName, attrs, children);
                }
            } else {
                throw new TypeError('An unknown tag name: ' + elName);
            }
        } else {
            throw new TypeError('First argument must be Constructor or String');
        }
    }
};

module.exports = React;