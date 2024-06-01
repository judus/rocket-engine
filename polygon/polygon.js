export default class Polygon {
    constructor(canvasId, imgSrc, coordinatesId) {
        this.perimeter = [];
        this.complete = false;
        this.canvas = document.getElementById(canvasId);
        this.ctx = null;
        this.imgSrc = imgSrc;
        this.coordinatesId = coordinatesId;

        this.init();
    }

    init() {
        const img = new Image();
        img.src = this.imgSrc;

        img.onload = () => {
            this.ctx = this.canvas.getContext("2d");

            // Adjust canvas dimensions to match the image dimensions
            this.canvas.width = img.width;
            this.canvas.height = img.height;

            this.ctx.drawImage(img, 0, 0);
        };

        // Event listeners
        this.canvas.addEventListener('click', this.pointIt.bind(this));
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    lineIntersects(p0, p1, p2, p3) {
        const s1_x = p1.x - p0.x;
        const s1_y = p1.y - p0.y;
        const s2_x = p3.x - p2.x;
        const s2_y = p3.y - p2.y;

        const s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
        const t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);

        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }

    drawPoint(x, y) {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x - 2, y - 2, 4, 4);
    }

    undo() {
        this.ctx = null;
        this.perimeter.pop();
        this.complete = false;
        this.start(true);
    }

    clearCanvas() {
        this.ctx = null;
        this.perimeter = [];
        this.complete = false;
        document.getElementById(this.coordinatesId).value = "";
        this.start();
    }

    draw(end) {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "white";
        this.ctx.lineCap = "square";
        this.ctx.beginPath();

        this.perimeter.forEach((point, i) => {
            if(i === 0) {
                this.ctx.moveTo(point.x, point.y);
                if(!end) this.drawPoint(point.x, point.y);
            } else {
                this.ctx.lineTo(point.x, point.y);
                if(!end) this.drawPoint(point.x, point.y);
            }
        });

        if(end) {
            this.ctx.lineTo(this.perimeter[0].x, this.perimeter[0].y);
            this.ctx.closePath();
            this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            this.ctx.fill();
            this.ctx.strokeStyle = "blue";
            this.complete = true;
        }
        this.ctx.stroke();

        document.getElementById(this.coordinatesId).value = this.perimeter.length ? JSON.stringify(this.perimeter) : "";
    }

    checkIntersect(x, y) {
        if(this.perimeter.length < 4) return false;

        const p2 = this.perimeter[this.perimeter.length - 1];
        const p3 = {x, y};

        for(let i = 0; i < this.perimeter.length - 1; i++) {
            const p0 = this.perimeter[i];
            const p1 = this.perimeter[i + 1];

            if((p1.x === p2.x && p1.y === p2.y) || (p0.x === p3.x && p0.y === p3.y)) {
                continue;
            }

            if(this.lineIntersects(p0, p1, p2, p3)) {
                return true;
            }
        }
        return false;
    }

    pointIt(event) {
        if(this.complete) {
            alert("Polygon already created");
            return;
        }

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if(event.ctrlKey || event.which === 3 || event.button === 2) {
            if(this.perimeter.length < 3) {
                alert("You need at least three points for a polygon");
                return;
            }

            if(this.checkIntersect(this.perimeter[0].x, this.perimeter[0].y)) {
                alert("The line you are drawing intersects another line");
                return;
            }

            this.draw(true);
            alert("Polygon closed");
            event.preventDefault();
        } else {
            if(this.perimeter.length && x === this.perimeter[this.perimeter.length - 1].x && y === this.perimeter[this.perimeter.length - 1].y) {
                return; // same point - double click
            }

            if(this.checkIntersect(x, y)) {
                alert("The line you are drawing intersects another line");
                return;
            }

            this.perimeter.push({x, y});
            this.draw(false);
        }
    }
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {

    // Assign undo and clearCanvas methods to buttons
    document.getElementById("undoButton").addEventListener("click", () => polygon.undo());
    document.getElementById("clearButton").addEventListener("click", () => polygon.clearCanvas());
});
