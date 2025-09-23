import Task from "./Task";
class List {
    #title;
    #tasks;
    #id;
    static #counter = 0;

    constructor(title = "New List", tasks = [], id = null) {
        this.#title = title;
        this.#tasks = [];
        if (id == null) {
            this.#id = 10000 + List.#counter;
            List.#counter++;
        } else {
            this.#id = id;
        }
        for (const task of tasks) {
            this.addTask(task);
        }

    }
    //GET AND SET
    getTitle() {
        return this.#title;
    }
    setTitle(title) {
        this.#title = title;
    }
    getTasks() {
        return this.#tasks;
    }
    setTasks(tasks) {
        this.#tasks = tasks;
    }
    getId() {
        return this.#id;
    }
    /*
    setId(id) {
        this.#id = id;
    }
        */
    //METHODS
    addTask(task) {
        task.setListId(this.#id);
        this.#tasks.push(task);
    }
    removeTaskById(id) {
        const task = this.getTaskById(id);
        if (task) {
            this.#tasks = this.#tasks.filter(t => t.getId() !== id);
            return task;
        }
        console.log("The ID: " + id + "doesn't match any task.");
        return null;
    }
    getTaskById(id) {
        for (const task of this.#tasks) {
            if (task.getId() == id) {
                return task;
            }
        }
        console.log("The ID: " + id + "doesn't match any task.");
        return null;
    }

    //SERIALIZATION
    toJSON() {
        return {
            title: this.#title,
            id: this.#id,
            tasks: this.#tasks.map(t => t.toJSON()), // serialize tasks too
        };
    }

    static fromJSON(obj) {
        const list = new List(
            obj.title,
            obj.tasks.map(t => Task.fromJSON(t)),
            obj.id
        );

        // update List counter
        if (obj.id >= 10000 + List.#counter) {
            List.#counter = obj.id - 10000 + 1;
        }

        return list;
    }

}
export default List;