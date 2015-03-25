var Block = require('../../lib/Block');
var React = require('../../lib/React');

class Button extends Block {
    template() {
        return (
            <div>
                <div element="foo">
                    { this.children.join() }
                </div>
            </div>
        )
    }
}

module.exports = Button;