class Stylist {
    static colorNode(node, color, font = false, bg = false, border = false, borderStyle = "1px solid") {
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
    static capitalizeFirst(word) {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
export default Stylist;