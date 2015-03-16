var Element = require('./Element');

class SelfClosingElement extends Element {
    toString() {
        var result = '<' + this.name;
        for (var attr in this.attrs) {
            result += ' ' + attr + '="' + this.attrs[attr] + '"';
        }
        result += ' />';
        return result;
    }
}

module.exports = SelfClosingElement;


