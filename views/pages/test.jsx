var React = require('../lib/React');
var Page = require('../lib/Page');
var Jopa = require('../blocks/jopa/jopa');

class TestPage extends Page {
    toString() {
        return (
            <Jopa position="top" mod="rounded">
                <h1 class="jopa-cl">Привет<span class="jopa2-cl">как <em>дела</em>?</span></h1>
                <img element="img" src='x' onerror="alert(1)" />
            </Jopa>
        ).toString();
    }
}

module.exports = TestPage;