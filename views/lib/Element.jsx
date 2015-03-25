class Element {
    static buildBEMClassName(blockName, elementName) {
        return blockName + Element.ELEMENT_SEPARATOR + elementName;
    }

    constructor(nodeName, attrs, children) {
        this.nodeName = nodeName.toLowerCase();
        this.attrs = attrs || {};
        this.attrs.class = new ClassList(this.attrs.class ? this.attrs.class.split(' ') : undefined);
        this.name = this.attrs.element;
        delete this.attrs.element;
        this.children = children || [];
        this.class = new ClassList();
        this.parentBlock = null;
    }

    setNodeName(nodeName) {
        this.nodeName = nodeName;
    }

    setParentBlock(block) {
        this.parentBlock = block;
        if (this.name !== undefined) {
            this.addClass(Element.buildBEMClassName(this.parentBlock.name, this.name));
        }
    }

    addClass(className) {
        this.attrs.class.add(className);
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

module.exports = Element;

class ClassList {
    constructor(initialValues) {
        this.set = new Set(initialValues);
    }

    add(className) {
        this.set.add(className);
    }

    remove(className) {
        this.set.delete(className);
    }

    has(className) {
        return this.set.has(className);
    }

    toString() {
        var array = [];
        for (var v of this.set) {
            array.push(v);
        }
        return array.join(' ');
    }
}


