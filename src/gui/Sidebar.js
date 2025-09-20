import "../css/sidebar.css";
import NodeFactory from "../lib/NodeFactory";

class Sidebar {
    render(lists) {
        const sidebarNode = document.getElementById("sidebar");
        const listsParent = this.segmentSidebar(sidebarNode);
        for (const list of lists) {
            this.appendList(list, listsParent);
        }
        return listsParent;
    }
    segmentSidebar(sidebarNode) {
        const title = NodeFactory.newTitle("h2", "All Lists", ["sidebarTitle"]); //SIDEBAR TITLE
        const header = NodeFactory.newContainer([title], ["sidebarHeader"]);

        const listsContainer = NodeFactory.newContainer([], ["sidebarListContainer"]);
        const addListBtn = NodeFactory.newBtn("button", "Add list", ["sidebarAddListBtn", "btn"]);
        const body = NodeFactory.newContainer([listsContainer, addListBtn], ["sidebarBody"]);
        console.log(sidebarNode);
        sidebarNode.appendChild(header);
        sidebarNode.appendChild(body);

        return listsContainer;
    }
    appendList(list, parent) {
        const title = NodeFactory.newTitle("h3", list.getTitle(), ["sidebarListTitle"]);
        const container = NodeFactory.newContainer([title],["sidebarListDiv"], list.getId());
        parent.appendChild(container);
        return container;
    }
}
export default Sidebar;