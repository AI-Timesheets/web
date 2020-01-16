export class ListHelper {

    static indexOf(list, element, idFn) {
        for (let i = 0; i < list.length; i++) {
            if (idFn(list[i]) === idFn(element)) {
                return i;
            }
        }

        return -1;
    }

    static find(list, element, idFn) {
        const index = this.indexOf(list, element, idFn);

        if (index === -1) {
            throw new Error("Element does not exist in list.");
        }

        return list[index];
    }

    static contains(list, element, idFn) {
        return this.indexOf(list, element, idFn) !== -1;
    }

    static remove(list, element, idFn) {
        const index = this.indexOf(list, element, idFn);

        if (index === -1) {
            throw new Error("Element does not exist in list");
        }

        list.splice(index, 1);

        return list;
    }

    static indexOfById(list, id, idFn) {
        for (let i = 0; i < list.length; i++) {
            if (idFn(list[i]) === id) {
                return i;
            }
        }

        return -1;
    }

    static findById(list, id, idFn) {
        const index = this.indexOfById(list, id, idFn);

        if (index === -1) {
            throw new Error("Element does not exist in list.");
        }

        return list[index];
    }

    static containsId(list, id, idFn) {
        return this.indexOf(list, id, idFn) !== -1;
    }

    static removeById(list, id, idFn) {
        const index = this.indexOfById(list, id, idFn);

        if (index === -1) {
            throw new Error("Element does not exist in list");
        }

        list.splice(index, 1);

        return list;
    }
}

export const DEFAULT_LIST = [];
export const DEFAULT_LIST_ID_FN = (el) => el;

export class List {

    constructor(list = DEFAULT_LIST, idFn = DEFAULT_LIST_ID_FN) {
        this.list = list;
        this.idFn = idFn;
    }

    valueOf() {
        return this.list;
    }

    set(list) {
        this.list = list;
    }

    get() {
        return this.list;
    }

    getIndex(index) {
        return this.list[index];
    }

    push(el) {
        this.list.push(el);
    }

    length() {
        return this.list.length;
    }

    indexOf(id) {
        return ListHelper.indexOfById(this.list, id, this.idFn);
    }

    find(id) {
        return ListHelper.findById(this.list, id, this.idFn);
    }

    contains(id) {
        return ListHelper.containsId(this.list, id, this.idFn);
    }

    remove(id) {
        return ListHelper.removeById(this.list, id, this.idFn);
    }
}