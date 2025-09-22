//GUI
import "./css/main.css";
import Sidebar from "./gui/Sidebar";

//MODEL
import ListsMemory from "./classes/ListsMemory";
import List from "./classes/List";
import Task from "./classes/Task";
import MainGui from "./gui/MainGui";

const appController = () => {
    const memory = new ListsMemory();
    const lists = memory.getLists();

    const main = new MainGui();
    const sidebar = new Sidebar();

    const mockContent = () => {
        const task1 = new Task();
        const task2 = new Task();
        const task3 = new Task();
        const task4 = new Task();
        const task5 = new Task();
        const task6 = new Task();
        const task7 = new Task();
        const task8 = new Task();
        const task9 = new Task();
        const task10 = new Task();
        const list1 = new List("List 1", [task1, task2, task3, task4, task5]);
        const list2 = new List("List 2", [task6, task7, task8, task9]);
        const list3 = new List("List 3", [task10]);
        memory.addList(list1);
        memory.addList(list2);
        memory.addList(list3);
    }

    const renderGui = () => {
        const sidebarNode = sidebar.render(memory);

        sidebarNode.addEventListener("click", (e) => {
            const listDiv = e.target.closest(".sidebarListDiv");

            if (!listDiv) return;

            const currentList = memory.getListById(Number(listDiv.id));
            if (!currentList) return;

            // Render principal
            const mainNode = main.render(currentList);
            mainNode.addEventListener("click", (e) => {
                if (e.target.classList.contains("mainEditBtn")) {
                    main.promptEditList(currentList, sidebar, memory);
                }
                if(e.target.classList.contains("mainRemoveBtn")){
                    console.log("remove btn");
                    main.promptDeleteList(currentList, sidebar, memory);
                }
            })
        });
    };


    const start = () => {
        mockContent();
        renderGui();
    }
    return { start }
}

const app = appController();
app.start();


console.log("all working");
