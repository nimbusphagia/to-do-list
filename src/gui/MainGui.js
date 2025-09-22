import NodeFactory from "../lib/NodeFactory";
import "../css/body.css";
import Task from "../classes/Task";
class MainGui {
    render(list) {
        const mainNode = document.getElementById("main");
        mainNode.innerHTML = "";

        const tasksParent = this.segmentList(mainNode, list);
        for (const task of list.getTasks()) {
            this.appendTask(task, tasksParent, list);
        }
        return mainNode;
    }
    segmentList(mainNode, list) {
        const title = NodeFactory.newTitle("h2", list.getTitle(), ["mainTitle"]); //SIDEBAR TITLE
        const editBtn = NodeFactory.newBtn("button", "", ["mainEditBtn", "icon", "editIcon"]);
        const removeBtn = NodeFactory.newBtn("button", "", ["mainRemoveBtn", "icon", "deleteIcon"]);
        const btnsContainer = NodeFactory.newContainer([editBtn, removeBtn], ["mainBtnContainer"]);
        const header = NodeFactory.newContainer([title, btnsContainer], ["mainHeader"], list.getId());

        const tasksContainer = NodeFactory.newContainer([], ["mainTaskContainer"]);
        const addTaskBtn = NodeFactory.newBtn("button", "Add task", ["mainAddTaskBtn", "btn"]);
        const body = NodeFactory.newContainer([tasksContainer, addTaskBtn], ["mainBody"]);
        mainNode.appendChild(header);
        mainNode.appendChild(body);
        //EDIT LIST TITLE OUTSIDE
        //ADD NEW TASK
        addTaskBtn.addEventListener("click", () => this.promptNewTask(list));
        return tasksContainer;
    }
    appendTask(task, parent, list) {
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
        const date = NodeFactory.newTitle("h5", task.formatDate(), ["mainTaskDate"]);
        const body = NodeFactory.newContainer([description, date], ["mainTaskBody"]);

        const container = NodeFactory.newContainer([header, body], ["mainTaskDiv"], `${task.getListId()}-${task.getId()}`);
        parent.appendChild(container);

        //EDIT Task
        editBtn.addEventListener("click", () => this.promptEditTask(task, list));
        //DELETE TASK
        removeBtn.addEventListener("click", () => this.promptDeleteTask(task, list));
        return container;
    }
    promptEditTask(task, list) {
        const title = task.getTitle() || "";
        const description = task.getDescription() || "";
        const date = task.getDateForInput() || "";

        const taskEditForm = NodeFactory.newForm(title, description, date);
        taskEditForm.submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Collect values
            const titleVal = taskEditForm.form.querySelector("[name='title']").value;
            const descriptionVal = taskEditForm.form.querySelector("[name='description']")?.value || "";
            const dateVal = taskEditForm.form.querySelector("[name='date']")?.value || "";
            //Change task values
            task.setTitle(titleVal);
            task.setDescription(descriptionVal);
            task.setDate(dateVal);
            //Close form and overlay
            NodeFactory.removeOverlay(taskEditForm.popup);
            taskEditForm.popup.remove();
            this.render(list);
        });
    }
    promptNewTask(list) {
        const taskForm = NodeFactory.newForm("", "", "");
        taskForm.submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Collect values
            const titleVal = taskForm.form.querySelector("[name='title']").value;
            const descriptionVal = taskForm.form.querySelector("[name='description']")?.value || "";
            const dateVal = taskForm.form.querySelector("[name='date']")?.value || "";
            //Create new task and add to list
            const newTask = new Task(titleVal, descriptionVal, dateVal);
            list.addTask(newTask);
            //Close form and overlay
            NodeFactory.removeOverlay(taskForm.popup);
            taskForm.popup.remove();
            this.render(list);
        });
    }
    promptDeleteTask(task, list) {
        const deletePrompt = NodeFactory.newPrompt("Are you sure you want to permanently delete this task?", "Delete", "Cancel", ["dangerTitle", "confirmationBtn"], ["neutralTitle", "confirmationBtn"]);
        deletePrompt.prompt.addEventListener("click", (e) => {
            if (e.target.classList.contains("dangerTitle")) {
                list.removeTaskById(task.getId());
            }
            NodeFactory.removeOverlay(deletePrompt.prompt);
            deletePrompt.prompt.remove();
            this.render(list);
            console.log(list);
        });
    }
    promptEditList(list, sidebar, memory) {
        const title = list.getTitle() || "";

        const listEditForm = NodeFactory.newForm(title);
        listEditForm.submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Collect values
            const titleVal = listEditForm.form.querySelector("[name='title']").value;
            //Change list title
            list.setTitle(titleVal);
            //Close form and overlay
            NodeFactory.removeOverlay(listEditForm.popup);
            listEditForm.popup.remove();
            //ACTUALIZA EL MAIN
            this.render(list);
            //ACTUALIZA EL SIDEBAR
            sidebar.render(memory);
        });
    }
    promptDeleteList(list, sidebar, memory) {
        const deletePrompt = NodeFactory.newPrompt("Are you sure you want to permanently delete this list? This will also delete all tasks", "Delete", "Cancel", ["dangerTitle", "confirmationBtn"], ["neutralTitle", "confirmationBtn"]);
        deletePrompt.prompt.addEventListener("click", (e) => {
            if (e.target.classList.contains("dangerTitle")) {
                memory.removeListById(list.getId());
            }
            NodeFactory.removeOverlay(deletePrompt.prompt);
            deletePrompt.prompt.remove();
            //LIMPIA EL MAIN
            const mainNode = document.getElementById("main");
            mainNode.innerHTML = "";
            //ACTUALIZA EL SIDEBAR
            sidebar.render(memory);
        });
    }
}
export default MainGui;