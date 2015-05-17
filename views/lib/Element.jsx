var ClassList = require('./ClassList');

class Element {
    static buildBEMElementName(blockName, elementName) {
        return blockName + Element.ELEMENT_SEPARATOR + elementName;
    }

    constructor(nodeName, attrs, children) {
        this.nodeName = nodeName.toLowerCase();
        this.attrs = attrs || {};
        this.children = children || [];
        this.parentBlock = null;
        this.name = this.attrs.element;
        delete this.attrs.element;
        this.attrs.class = new ClassList(this.attrs.class ? this.attrs.class.split(' ') : undefined);
    }

    setNodeName(nodeName) {
        this.nodeName = nodeName;
    }

    setName(name) {
        this.name = name;
    }

    setParentBlock(block) {
        this.parentBlock = block;
        if (this.name) {
            this.addClass(Element.buildBEMElementName(this.parentBlock.name, this.name));
        }
    }

    addClass(className) {
        this.attrs.class.add(className);
    }

    removeClass(className) {
        this.attrs.class.delete(className);
    }

    toString() {
        var result = '<' + this.nodeName;
        for (var attr in this.attrs) {
            result += ' ' + attr + '="' + this.attrs[attr] + '"';
        }
        result += '>';
        result += this.children.join('');
        result += '</' + this.nodeName + '>';
        return result;
    }
}

Element.prototype.valueOf = Element.prototype.toString;

Element.ELEMENT_SEPARATOR = '__';
Element.MOD_SEPARATOR = '_';

module.exports = Element;




