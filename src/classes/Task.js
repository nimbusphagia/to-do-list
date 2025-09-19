import { format, parseISO} from "date-fns";
class Task {
    static #counter;
    #title;
    #description;
    #date;
    #status;
    #listId;
    #id;
    constructor(title = "New task", description = "Add a short description", date = "YYYY-MM-DD", status = "Ongoing", listId = 10000, id = null) {
        this.#title = title;
        this.#description = description;
        this.#date = parseISO(date);
        this.#status = status;
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
        this.#date = parseISO(date);
    }
    getStatus() {
        return this.#status;
    }
    setStatus(status) {
        this.#status = status;
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
    formatDate(pattern = "dd/MM/yyyy") {
        return format(this.#date, pattern);
    }
}
export default Task;