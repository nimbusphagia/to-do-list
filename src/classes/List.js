class List {
    #title;
    #tasks;
    #id;
    static #counter = 0;

    constructor(title = "New List", tasks = [], id = null) {
        this.#title = title;
        this.#tasks = tasks;
        if (id == null) {
            this.#id = 10000 + List.#counter;
            List.#counter++;
        } else {
            this.#id = id;
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
}
export default List;