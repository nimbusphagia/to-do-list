import { format, parseISO } from "date-fns";
class Task {
    static #counter = 0;
    #title;
    #description;
    #date;
    #status;
    #listId;
    #id;
    #priority
    constructor(title = "New task", description = "Add a short description", date = "", status = "Ongoing", priority = "Casual", listId = 1000, id = null) {
        this.#title = title;
        this.#description = description;
        if (!date) {       // catches "", null, undefined
            this.#date = null;
        } else {
            this.#date = parseISO(date);
        }

        this.#status = status;
        this.#priority = priority;
        this.#listId = listId;
        if (id == null) {
            this.#id = 100 + Task.#counter;
            Task.#counter++;
        } else {
            this.#id = id;
        }
    }
    //GET SET
    getTitle() {
        return this.#title;
    }
    setTitle(title) {
        this.#title = title;
    }
    getDescription() {
        return this.#description;
    }
    setDescription(description) {
        this.#description = description;
    }
    getDate() {
        return this.#date;
    }
    setDate(date) {
        if (!date) {       // catches "", null, undefined
            this.#date = null;
        } else {
            this.#date = parseISO(date);
        }
    }

    getStatus() {
        return this.#status;
    }
    setStatus(status) {
        this.#status = status;
    }
    getPriority(){
        return this.#priority;
    }
    setPriority(priority){
        this.#priority = priority;
    }
    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }
    getListId() {
        return this.#listId;
    }
    setListId(listId) {
        this.#listId = listId;
    }
    //METHODS
    formatDate(pattern = "dd MMM yyyy") {
        if (!this.#date) return "";  // ✅ return empty if no date
        return format(this.#date, pattern);
    }
    getDateForInput() {
        if (!this.#date) return ""; // ✅ return empty string for <input type="date">
        return format(this.#date, "yyyy-MM-dd");
    }
    //SERIALIZATION
    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            date: this.#date ? format(this.#date, "yyyy-MM-dd") : "", // 
            status: this.#status,
            priority: this.#priority,
            listId: this.#listId,
            id: this.#id,
        };
    }
    static fromJSON(obj) {
        const task = new Task(
            obj.title,
            obj.description,
            obj.date || "",
            obj.status,
            obj.priority,
            obj.listId,
            obj.id
        );

        // update Task counter
        if (obj.id >= 100 + Task.#counter) {
            Task.#counter = obj.id - 100 + 1;
        }

        return task;
    }
}
export default Task;