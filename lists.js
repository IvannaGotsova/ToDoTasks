export default class Lists {
    constructor() {
        this._lists = [];
    }

    getLists() {
        return this._lists;
    }

    addList(listObject) {
        this._lists.push(listObject);
    }

    removeAllLists(id) {
        for (let index = 0; index < this._lists.length; index++) {
            if (this._lists[i]._id == id) {
                this._lists.splice(i, 1);
                break;
            }
        }
    }

    removeSelectedLists() {
        this._lists = [];
    }
}