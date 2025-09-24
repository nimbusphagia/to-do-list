import List from "./List";
import Task from "./Task";
class ListsMemory {
    #lists
    #initialTask = new Task("Do something!","Think about it", "2025-09-23");
    #initialList = new List("Today",[this.#initialTask]);
    constructor(lists = []) {
        this.#lists = [this.#initialList];
        for (const list of lists) {
            if (!this.#lists.find(l => l.getTitle() === list.getTitle())) {
                this.addList(list);
            }
        }
    }

    //GET AND SET
    getLists() {
        return this.#lists;
    }
    setLists(lists) {
        this.#lists = lists;
    }
    //METHODS
    addList(list) {
        this.#lists.push(list);
        this.save();
    }
    removeListById(id) {
        const list = this.getListById(id);
        if (list) {
            this.#lists = this.#lists.filter(l => l.getId() !== id);
            this.save();
            return list;
        }
        console.log("The ID: " + id + "doesn't match any list.");
        return null;
    }
    getListById(id) {
        for (const list of this.#lists) {
            if (list.getId() == id) {
                return list;
            }
        }
        console.log("The ID: " + id + "doesn't match any task.");
        return null;
    }

    save() {
        localStorage.setItem("lists", JSON.stringify(this.#lists));
    }

    load() {
        const data = localStorage.getItem("lists");
        if (data) {
            const rawLists = JSON.parse(data);
            this.#lists = rawLists.map(l => List.fromJSON(l));
        }
    }
}
export default ListsMemory;