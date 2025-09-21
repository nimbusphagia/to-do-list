//GUI
import "./css/main.css";
import Sidebar from "./gui/Sidebar";

//MODEL
import List from "./classes/List";
import Task from "./classes/Task";
import MainGui from "./gui/MainGui";

const appController = () => {
    const lists = [];
    const getListById = (id) => {
        for (const list of lists) {
            if (id == list.getId()) {
                return list;
            }
        }
        return null;
    }
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
        const list1 = new List("List 1", [task1, task2, task3, task4, task5],);
        const list2 = new List("List 2", [task6, task7, task8, task9],);
        const list3 = new List("List 3", [task10],);
        lists.push(list1);
        lists.push(list2);
        lists.push(list3);
    }

    const renderGui = () => {
        const main = new MainGui();
        const sidebar = new Sidebar();

        const listsContainer = sidebar.render(lists);
        listsContainer.addEventListener("click", (e) => {
            const listDiv = e.target.closest(".sidebarListDiv");
            console.log(listDiv);
            if (listDiv) {
                const currentList = getListById(listDiv.id);
                if (currentList) {
                    console.log(currentList);
                    main.render(currentList);
                }
            }
        })
    }
    return { renderGui, mockContent }
}

const app = appController();
app.mockContent();
app.renderGui();


console.log("all working");
