import Stylist from "./Stylist";
class NodeFactory {
    //CONTAINER DIV
    static newContainer(childrenNodes = [], classList = [], id = null) {
        const divNode = document.createElement("div");
        for (const className of classList) {
            divNode.classList.add(className)
        }
        for (const node of childrenNodes) {
            divNode.appendChild(node);
        }
        if (id != null) {
            divNode.id = id;
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
    static newBtn(type, textContent, classList = []) {
        const btn = document.createElement("button");
        btn.type = type;
        btn.textContent = textContent;
        for (const className of classList) {
            btn.classList.add(className)
        }

        return btn;
    }
    static newForm(title = null, description = null, date = null) {
        const closeBtn = this.newBtn("button", "", ["icon", "closeIcon"])
        const btnContainer = this.newContainer([closeBtn], ["popupBtns"])

        const form = document.createElement("form");
        const titleInput = this.newFormItem("title", title, "text");
        form.appendChild(titleInput);

        if (description != null && date !== null) {
            const descriptionInput = this.newFormItem("description", description, "textarea");
            const dateInput = this.newFormItem("date", date, "date");
            form.appendChild(descriptionInput);
            form.appendChild(dateInput);
        }
        const submitBtn = this.newBtn("button", "Save", ["btn", "saveBtn"]);
        form.appendChild(submitBtn);

        const popup = this.newContainer([btnContainer, form], ["popup"])
        this.createOverlay(popup);

        //CLOSE     
        closeBtn.addEventListener("click", () => {
            this.removeOverlay(popup);
            popup.remove();
        });

        return popup;
    }
    static newFormItem(name, value, type) {
        const label = document.createElement("label");
        label.htmlFor = name;
        label.textContent = `${Stylist.capitalizeFirst(name)}:`;
        let input = document.createElement("input");
        input.type = type;
        if(type == "textarea"){
            input = document.createElement("textarea");
        }
        input.id = name;
        input.name = name;
        input.value = value;
        const inputDiv = this.newContainer([label, input], ["formItem"]);
        return inputDiv;
    }
    static createOverlay(popup) {
        this.removeOverlay(popup);
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        document.body.appendChild(overlay);
        overlay.appendChild(popup);
        popup.style.zIndex = 200;

    }
    static removeOverlay(popup) {
        const overlay = document.getElementById("overlay");
        if (overlay) {
            overlay.remove();
        }
        popup.style.zIndex = "auto";

    }
}
export default NodeFactory;