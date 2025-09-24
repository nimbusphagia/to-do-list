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
    static newForm(title = null, description = null, date = null, priority = null) {
        const closeBtn = this.newBtn("button", "", ["icon", "closeIcon"])
        const btnContainer = this.newContainer([closeBtn], ["popupBtns"])

        const form = document.createElement("form");
        const titleInput = this.newFormItem("title", title, "text", "Title");
        titleInput.querySelector("input[name='title']").required = true;
        form.appendChild(titleInput);

        if (description != null && date !== null && priority !== null) {
            const descriptionInput = this.newFormItem("description", description, "textarea", "Description");
            const dateInput = this.newFormItem("date", date, "date");
            const priorityInput = this.newRadioInput("priority", ["Casual", "Important", "Urgent"], priority);
            priorityInput.querySelector("input[name='priority']").required = true;
            form.appendChild(descriptionInput);
            form.appendChild(dateInput);
            form.appendChild(priorityInput);
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

        return { popup, form, submitBtn };
    }
    static newFormItem(name, value, type, placeholder = null) {
        const label = document.createElement("label");
        label.htmlFor = name;
        label.textContent = `${Stylist.capitalizeFirst(name)}:`;
        let input = document.createElement("input");
        input.type = type;
        if (type == "textarea") {
            input = document.createElement("textarea");
        }
        input.id = name;
        input.name = name;
        if (value != "") {
            input.value = value;
        }

        if (placeholder != null) {
            input.placeholder = placeholder;
        }
        const inputDiv = this.newContainer([label, input], ["formItem"]);
        return inputDiv;
    }
    static newRadioInput(name, options = [], value) {
        const nodes = [];

        for (const option of options) {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = name;
            input.value = option;
            if(input.value == value){
                input.checked = true;
            }

            // Create a safe, unique id for each radio
            const safeId = `${name}-${option.replace(/\s+/g, "-").toLowerCase()}`;
            input.id = safeId;

            const label = document.createElement("label");
            label.classList.add("radioInput");
            label.htmlFor = safeId;
            label.textContent = Stylist.capitalizeFirst(option);

            // Put input *inside* label for better accessibility
            label.prepend(input);

            nodes.push(label);
        }

        const inputContainer = this.newContainer(nodes, ["formRadioContainer"]);
        return inputContainer;
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
    static newPrompt(question, positiveAnswer, negativeAnswer, positiveStyle = [], negativeStyle = []) {
        const title = this.newTitle("h2", question, []);
        const acceptBtn = this.newBtn("button", positiveAnswer, positiveStyle);
        const cancelBtn = this.newBtn("button", negativeAnswer, negativeStyle);
        const btnContainer = this.newContainer([acceptBtn, cancelBtn], ["promptAnswers"]);
        const prompt = this.newContainer([title, btnContainer], ["prompt"]);
        this.createOverlay(prompt);
        return { prompt, acceptBtn, cancelBtn };
    }
}
export default NodeFactory;