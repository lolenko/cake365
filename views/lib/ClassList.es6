class ClassList {
    constructor(initialValues) {
        this.set = new Set(initialValues);
    }

    add(className) {
        this.set.add(className);
    }

    remove(className) {
        this.set.delete(className);
    }

    has(className) {
        return this.set.has(className);
    }

    clone() {
        return new ClassList(this.toArray());
    }

    toArray() {
        var array = [];
        for (var v of this.set) {
            array.push(v);
        }
        return array;
    }

    toString() {
        return this.toArray().join(' ');
    }
}

module.exports = ClassList;