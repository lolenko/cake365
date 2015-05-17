var Element = require('./Element');

class _Block extends Element {

}

class Block {
    static buildBEMModName(blockName, modName, value) {
        var className =  blockName + Element.MOD_SEPARATOR + modName;
        if (value) {
            className += Element.MOD_SEPARATOR + value;
        }
        return className;
    }

    constructor(attrs, children) {
        this.attrs = attrs || {};
        this.children = children || [];
        this.rootElement = this.template();

        this.setName(this.constructor.name.toLowerCase());

        if (this.attrs.element) {
            this.setElementName(this.attrs.element);
            delete this.attrs.element;
        }

        for (var attrName in this.attrs) {
            if (attrName.match(/^mod-([\w\-]+)$/)) {
                var modName = RegExp.$1;
                this.addMod(modName, this.attrs[attrName]);
                delete this.attrs[attrName];
            }
        }

        this.each((child) => {
            if (child instanceof Block || child instanceof Element) {
                child.setParentBlock(this);
            }
        });
    }

    setNodeName(nodeName) {
        this.rootElement.setNodeName(nodeName);
    }

    setName(name) {
        this.name = name;
        this.rootElement.addClass(this.name);
    }

    setElementName(name) {
        this.rootElement.setName(name);
    }

    addMod(name, value) {
        this.rootElement.addClass(Block.buildBEMModName(this.name, name, value));
    }

    removeMod(name) {
        this.rootElement.removeClass(Block.buildBEMModName(this.name, name, value));
    }

    setParentBlock(block) {
        this.rootElement.setParentBlock(block);
    }

    each(cb) {
        this.rootElement.children.forEach((child) => {
            if (child instanceof Block || child instanceof Element) {
                child.children.forEach(cb);
            }
            cb(child);
        });
    }

    template() {
        return (
            <div>
                { this.children.join() }
            </div>
        )
    }

    toString() {
        return this.rootElement.toString();
    }
}

module.exports = Block;


