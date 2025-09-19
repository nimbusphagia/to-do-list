class NodeFactory {
    //CONTAINER DIV
    static newContainer(childrenNodes = [], classList = []) {
        const divNode = document.createElement("div");
        for (const className of classList) {
            divNode.classList.add(className)
        }
        for (const node of childrenNodes) {
            divNode.appendChild(node);
        }
        return divNode;
    }
    //TITLES
    static newTitle(type, textContent, classList = []) {
        let titleNode;
        switch (type) {
            case "h1":
                titleNode = document.createElement("h1");
                break;
            case "h2":
                titleNode = document.createElement("h2");
                break;
            case "h3":
                titleNode = document.createElement("h3");
                break;
            case "h4":
                titleNode = document.createElement("h4");
                break;
            case "h5":
                titleNode = document.createElement("h5");
                break;
        }

        for (const className of classList) {
            titleNode.classList.add(className)
        }
        titleNode.textContent = textContent;
        return titleNode;
    }
}
export default NodeFactory;