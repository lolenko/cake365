var Block = require('../../lib/Block');
var React = require('../../lib/React');
var Button = require('../button/button');

class Jopa extends Block {
    template() {
        return (
            <div>
                Мой первый
                <div element="baran">
                    блок
                    <div element="baran-inner">
                        { this.children.join() }
                    </div>
                    <Button element="button">Кнопочка</Button>
                </div>
            </div>
        )
    }
}

module.exports = Jopa;