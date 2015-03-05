var React = require('../lib/React');
var Page = require('../lib/Page');

class TestPage extends Page {
    toString() {
        return (<b-jopa position="top"><h1 class="jopa">Привет<span class="jopa2">как <em>дела</em>?</span></h1></b-jopa>).toString();
    }
}

module.exports = TestPage;