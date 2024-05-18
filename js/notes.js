export default class Notes {
    constructor() {
        this._notes = [];
    }

    getNotes() {
        return this._notes;
    }

    addNote(noteObject) {
        this._notes.push(noteObject);
    }

    removeAllNotes(id) {
        for (let index = 0; index < this._notes.length; index++) {
            if (this._notes[i]._id == id) {
                this._notes.splice(i, 1);
                break;
            }
        }
    }

    removeSelectedNotes() {
        this._notes = [];
    }
}