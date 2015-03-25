var Element = require('./Element');

class Block {
    constructor(attrs, children) {
        this.name = this.constructor.name.toLowerCase();
        this.attrs = attrs || {};
        this.children = children || [];
        this.rootNode = this.template();
        this.rootNode.name = this.attrs.element;
        this.rootNode.addClass(this.name);

        this.each((child) => {
            if (child instanceof Block || child instanceof Element) {
                child.setParentBlock(this);
            }
        });
    }

    setNodeName(nodeName) {
        this.rootNode.setNodeName(nodeName);
    }

    setParentBlock(block) {
        this.rootNode.setParentBlock(block);
    }

    each(cb) {
        this.rootNode.children.forEach((child) => {
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
        return this.rootNode.toString();
    }
}

module.exports = Block;


