var Block = require('../../lib/Block');
var React = require('../../lib/React');

class Jopa extends Block {
    template() {
        return (
            <div class="baran">
                Мой первый
                блок
                { this.children.join() }
            </div>
        )
    }
}

module.exports = Jopa;