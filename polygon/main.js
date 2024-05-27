// Example usage
import Polygon from "./polygon.js";

document.addEventListener("DOMContentLoaded", () => {
    const polygon = new Polygon("jPolygon", "gunship-fighter-3.png", "coordinates");

    // Assign undo and clearCanvas methods to buttons
    document.getElementById("undoButton").addEventListener("click", () => polygon.undo());
    document.getElementById("clearButton").addEventListener("click", () => polygon.clearCanvas());
});