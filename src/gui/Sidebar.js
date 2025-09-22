import List from "../classes/List";
import "../css/sidebar.css";
import NodeFactory from "../lib/NodeFactory";

class Sidebar {
    render(memory) {
        const sidebarNode = document.getElementById("sidebar");
        sidebarNode.innerHTML = "";
        console.log()
        const lists = memory.getLists();
        const listsParent = this.segmentSidebar(sidebarNode, memory);
        for (const list of lists) {
            this.appendList(list, listsParent);
        }
        return sidebarNode;
    }
    segmentSidebar(sidebarNode, memory) {
        const title = NodeFactory.newTitle("h2", "All Lists", ["sidebarTitle"]); //SIDEBAR TITLE
        const header = NodeFactory.newContainer([title], ["sidebarHeader"]);

        const listsContainer = NodeFactory.newContainer([], ["sidebarListContainer"]);
        const addListBtn = NodeFactory.newBtn("button", "Add list", ["sidebarAddListBtn", "btn"]);
        const body = NodeFactory.newContainer([listsContainer, addListBtn], ["sidebarBody"]);
        sidebarNode.appendChild(header);
        sidebarNode.appendChild(body);
        //ADD
        addListBtn.addEventListener("click", () => this.promptNewList(memory));
        return listsContainer;
    }
    appendList(list, parent) {
        const title = NodeFactory.newTitle("h3", list.getTitle(), ["sidebarListTitle"]);
        const container = NodeFactory.newContainer([title], ["sidebarListDiv"], list.getId());
        parent.appendChild(container);
        return container;
    }
    promptNewList(memory) {
        const listForm = NodeFactory.newForm("");
        listForm.submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Collect values
            const titleVal = listForm.form.querySelector("[name='title']").value;
            //Create new list and add to array
            const newList = new List(titleVal, []);
            console.log(newList);
            memory.addList(newList);
            //Close form and overlay
            NodeFactory.removeOverlay(listForm.popup);
            listForm.popup.remove();
            this.render(memory);
        });
    }
}
export default Sidebar;