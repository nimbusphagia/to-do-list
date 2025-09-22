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
    }
    removeListById(id) {
        const list = this.getListById(id);
        if (list) {
            this.#lists = this.#lists.filter(l => l.getId() !== id);
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
    addNewList() {
        const newList = new List();
        this.addList(newList);
        return newList;
    }
}
export default ListsMemory;