class Element {
    constructor(name, attrs, children) {
/*
        if (!(this instanceof Element)) {
            return new Element(name, attrs, children);
        }
*/

        this.name = name.toLowerCase();
        this.attrs = attrs;
        this.children = children;
    }

    setElName(elName) {
        this.name = elName;
    }

    toString() {
        var result = '<' + this.name;
        for (var attr in this.attrs) {
            result += ' ' + attr + '="' + this.attrs[attr] + '"';
        }
        result += '>';
        this.children = this.children.map((child) => {
            return child.toString();
        });
        result += this.children.join('');
        result += '</' + this.name + '>';
        return result;
    }
}

Element.prototype.valueOf = Element.prototype.toString;

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

module.exports = Element;


