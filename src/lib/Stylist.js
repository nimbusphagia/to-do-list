class Stylist {
    colorNode(node, color, font = false, bg = false, border = false, borderStyle = "1px solid") {
        if (font) {
            node.style.color = color;
        }
        if (bg) {
            node.style.backgroundColor = color;
        }
        if (border) {
            node.style.border = borderStyle + color;
        }
    }
}