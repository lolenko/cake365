class Element {
  //static STATE_SEPARATOR = '_';
  //static ELEMENT_SEPARATOR = '__';


  static buildElementClassName(blockName, elName) {
    return blockName + Element.ELEMENT_SEPARATOR + elName;
  }

  static buildStateClassName(elName, stateName, stateValue) {
    var className = elName + Element.STATE_SEPARATOR + stateName;
    if (stateValue instanceof String) {
      className += Element.STATE_SEPARATOR + stateValue;
    }
    return className;
  }

  constructor(rootEl, block) {
    this.$root = $(rootEl);
    this.name = 'element';
    this.block = block;
  }

  setState(name, value) {
    this.removeState(name);
    this.$root.addClass(Element.buildStateClassName(Element.buildElementClassName(this.block.name, this.name), name, value))
  }

  removeState(name) {
    this.$root[0].className = this.$root[0].className.split(' ').filter((className)=> {
      return className.match(
        new RegExp(Element.buildStateClassName(Element.buildElementClassName(this.block.name, this.name), name) + '(' + Element.STATE_SEPARATOR + '.+)?')
      );
    }).join(' ');
  }

  remove() {
    this.$root.remove();
  }

  on() {
    this.$root.on.apply(this.$root, arguments);
  }
}

class ElementCollection {
  constructor(el) {
    this.elements = [];
    this.add.apply(this, arguments);
  }

  add(el) {
    Array.prototype.forEach.call(arguments, (el)=> {
      if (el instanceof Element) {
        this.elements.push(el);
      } else if (el instanceof ElementCollection) {
        el.each((innerEl)=> {
          this.add(innerEl);
        });
      } else {
        throw new TypeError('argument is not Element or ElementCollection');
      }
    });
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  get length() {
    return this.elements.length;
  }

  size() {
    return this.length;
  }

  remove() {
    this.each(function(el) {
      el.remove();
    });
    this.elements = [];
  }
}

export default class Block extends Element {
  constructor(rootEl, options) {
    super(rootEl, this);
    this.name = 'block';
    this.options = options;
    this._elements = {};
  }

  getElement(elName) {
    if (this._elements[elName] instanceof ElementCollection) {
      return this._elements[elName];
    }

    var $el = this.$root.find('.' + Element.buildElementClassName(this.name, elName));
    var elc = new ElementCollection();
    $el.each(function(i, el) {
      el = new Element(el, this);
      elc.add(el);
    });

    return this._elements[elName] = elc;
  }

  removeElement(el) {
    if (el instanceof String) {
      el = this.getElement(el);
    }

    if (el instanceof Element) {
      el.remove();
      delete this._elements[el.name];
    }
  }
}
