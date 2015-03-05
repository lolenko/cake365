var Block = require('./Block');

var HTML_TAGS = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];


class Element {
    static createElement(elName, attrs, ...children) {
        if (elName instanceof Block) {
            return new elName(attrs, children);
        } else if (typeof elName === 'string') {
            var blName = /^b-([\w_]+)$/.exec(elName);
            blName = blName && blName[1];
            if (blName) {
                var CurrentBlock = require('../blocks/' + blName + '/' + blName + '.jsx');
                return new CurrentBlock(attrs, children);
            } else {
                return new Element(elName, attrs, children);
            }
        } else {
            throw new TypeError('First argument must be Block or String');
        }
    }

    constructor(name, attrs, children) {
/*
        if (!(this instanceof Element)) {
            return new Element(name, attrs, children);
        }
*/

        this.name = name.toLowerCase();
        this.attrs = attrs;
        this.children = children;

        if (HTML_TAGS.indexOf(this.name) == -1) {
            //TODO
        }
    }

    setElName(elName) {
        this.name = elName;
    }

    toString() {
        var result = '<' + this.name;
        for (var attr in this.attrs) {
            result += ' ' + attr + '="' + this.attrs[attr] + '"';
        }
        result += '>';
        this.children = this.children.map((child) => {
            return child.toString();
        });
        result += this.children.join('');
        result += '</' + this.name + '>';
        return result;
    }
}

Element.prototype.valueOf = Element.prototype.toString;

module.exports = Element;


