var React = require('./React');

class Page {
    constructor(options) {
        this.options = options;
    }

    toString() {
        return <h1>You need to redefine toString method on you own page</h1>;
    }
}

Page.prototype.valueOf = Page.prototype.toString;

module.exports = Page;


