export default class Tasks {
    constructor() {
        this._tasks = [];
    }

    getTasks() {
        return this._tasks;
    }

    addTask(taskObject) {
        this._tasks.push(taskObject);
    }

    removeAllTasks(id) {
        for (let index = 0; index < this._tasks.length; index++) {
            if (this._tasks[i]._id == id) {
                this._tasks.splice(i, 1);
                break;
            }
        }
    }

    removeSelectedTasks() {
        this._tasks = [];
    }
}