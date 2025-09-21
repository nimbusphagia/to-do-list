import NodeFactory from "../lib/NodeFactory";
import "../css/body.css";
class MainGui {
    render(list) {
        const mainNode = document.getElementById("main");
        mainNode.innerHTML = "";

        const tasksParent = this.segmentList(mainNode, list);
        for (const task of list.getTasks()) {
            this.appendTask(task, tasksParent);
        }
    }
    segmentList(mainNode, list) {
        const title = NodeFactory.newTitle("h2", list.getTitle(), ["mainTitle"]); //SIDEBAR TITLE
        const editBtn = NodeFactory.newBtn("button", "", ["mainEditBtn", "icon", "editIcon"]);
        const removeBtn = NodeFactory.newBtn("button", "", ["mainRemoveBtn", "icon", "deleteIcon"]);
        const btnsContainer = NodeFactory.newContainer([editBtn, removeBtn], ["mainBtnContainer"]);
        const header = NodeFactory.newContainer([title, btnsContainer], ["mainHeader"]);

        const tasksContainer = NodeFactory.newContainer([], ["mainTaskContainer"]);
        const addTaskBtn = NodeFactory.newBtn("button", "Add task", ["mainAddTaskBtn", "btn"]);
        const body = NodeFactory.newContainer([tasksContainer, addTaskBtn], ["mainBody"]);
        mainNode.appendChild(header);
        mainNode.appendChild(body);
        //EDIT
        this.promptForm(editBtn, list);
        //ADD
        this.promptForm(addTaskBtn, list.addNewTask());
        return tasksContainer;
    }
    appendTask(task, parent) {
        //Header
        const title = NodeFactory.newTitle("h4", task.getTitle(), ["mainTaskTitle"]);
        const completeBtn = NodeFactory.newBtn("button", "", ["mainTaskCompleteBtn", "icon", "completeIcon"]);
        if (task.getStatus() == "Completed") {
            completeBtn.classList.replace("completeIcon", "completedIcon");
        }
        const titlePair = NodeFactory.newContainer([completeBtn, title], ["mainTaskTitlePair"]);

        const editBtn = NodeFactory.newBtn("button", "", ["mainTaskEditBtn", "icon", "editIcon"]);
        const removeBtn = NodeFactory.newBtn("button", "", ["mainTaskRemoveBtn", "icon", "deleteIcon"]);
        const btnsContainer = NodeFactory.newContainer([editBtn, removeBtn], ["mainTaskBtnContainer"]);
        const header = NodeFactory.newContainer([titlePair, btnsContainer], ["mainTaskHeader"]);
        //Body
        const description = NodeFactory.newTitle("h5", task.getDescription(), ["mainTaskDescription"]);
        const date = NodeFactory.newTitle("h5", task.getDate(), ["mainTaskDate"]);
        const body = NodeFactory.newContainer([description, date], ["mainTaskBody"]);

        const container = NodeFactory.newContainer([header, body], ["mainTaskDiv"]);
        parent.appendChild(container);

        //EDIT
        this.promptForm(editBtn, task);
        return container;
    }
    promptForm(btn, object) {
        const title = object.getTitle();

        btn.addEventListener("click", () => {
            try {
                const description = object.getDescription();
                const date = object.getDate();

                if (description && date) {
                    NodeFactory.newForm(title, description, date);
                } else {
                    NodeFactory.newForm(title);
                }
            } catch (error) {
                console.error("Error getting description or date:", error);
                NodeFactory.newForm(title);
            }
        });
    }

}
export default MainGui;