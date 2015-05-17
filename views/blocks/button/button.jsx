var Block = require('../../lib/Block');
var React = require('../../lib/React');

class Button extends Block {
    template() {
        return (
            <div>
                <button element="foo">
                    { this.children.join() }
                </button>
            </div>
        )
    }
}

module.exports = Button;