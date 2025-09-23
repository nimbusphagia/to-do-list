import List from "./List";
class ListsMemory {
    #lists
    constructor(lists = []) {
        this.#lists = [];
        for (const list of lists) {
            this.addList(list);
        }

    }
    //GET AND SET
    getLists(){
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