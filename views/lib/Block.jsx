var Element = require('./Element');

class Block {
    constructor(attrs, children) {
        this.attrs = attrs;
        this.children = children;
        this.tmpl = this.template();
    }

    setElName(elName) {
        this.tmpl.setElName(elName);
    }

    template() {
        return (
            <div>
                { this.children.join() }
            </div>
        )
    }

    toString() {
        return this.tmpl.toString();
    }
}

module.exports = Block;


