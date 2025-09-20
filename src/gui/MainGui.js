import NodeFactory from "../lib/NodeFactory";

class MainGui {
    render(list) {
        const mainNode = document.getElementById("main");

        const tasksParent = this.segmentList(mainNode, list.getTitle());
        for (const task of list.getTasks()) {
            this.appendTask(task, tasksParent);
        }
    }
    segmentList(mainNode, listTitle) {
        const title = NodeFactory.newTitle("h2", listTitle, ["mainTitle"]); //SIDEBAR TITLE
        const editBtn = NodeFactory.newBtn("button", "Edit",["mainEditBtn", "btn"]);
        const removeBtn = NodeFactory.newBtn("button", "Remove",["mainRemoveBtn", "btn"]);
        const btnsContainer = NodeFactory.newContainer([editBtn, removeBtn], ["mainBtnContainer"]);
        const header = NodeFactory.newContainer([title, btnsContainer], ["mainHeader"]);

        const tasksContainer = NodeFactory.newContainer([], ["mainTaskContainer"]);
        const addTaskBtn = NodeFactory.newBtn("button", "Add task", ["mainAddTaskBtn", "btn"]);
        const body = NodeFactory.newContainer([tasksContainer, addTaskBtn], ["mainBody"]);
        mainNode.appendChild(header);
        mainNode.appendChild(body);

        return tasksContainer;
    }
    appendTask(task, parent) {
        const title = NodeFactory.newTitle("h3", task.getTitle(), ["mainTaskTitle"]);
        const container = NodeFactory.newContainer([title], ["mainTaskDiv"]);
        parent.appendChild(container);
        return container;
    }
}
export default MainGui;