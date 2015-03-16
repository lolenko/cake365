var React = require('../lib/React');
var Page = require('../lib/Page');
var Jopa = require('../blocks/jopa/jopa');

class TestPage extends Page {
    toString() {
        return (
            <Jopa position="top">
                <h1 class="jopa">Привет<span class="jopa2">как <em>дела</em>?</span></h1>
                <img src='x' onerror="alert(1)" />
            </Jopa>
        ).toString();
    }
}

module.exports = TestPage;