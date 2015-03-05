"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = require("../lib/React");
var Page = require("../lib/Page");

var TestPage = (function (Page) {
    function TestPage() {
        _classCallCheck(this, TestPage);

        if (Page != null) {
            Page.apply(this, arguments);
        }
    }

    _inherits(TestPage, Page);

    _prototypeProperties(TestPage, null, {
        toString: {
            value: function toString() {
                return React.createElement(
                    "b-jopa",
                    { position: "top" },
                    React.createElement(
                        "h1",
                        { "class": "jopa" },
                        "Привет",
                        React.createElement(
                            "span",
                            { "class": "jopa2" },
                            "как ",
                            React.createElement(
                                "em",
                                null,
                                "дела"
                            ),
                            "?"
                        )
                    )
                ).toString();
            },
            writable: true,
            configurable: true
        }
    });

    return TestPage;
})(Page);

module.exports = TestPage;
