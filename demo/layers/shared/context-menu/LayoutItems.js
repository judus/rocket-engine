export class Column {
    constructor(items, config) {
        this.items = items;
        this.config = config;
    }

    render(context, x, y) {
        let offsetY = y;
        this.items.forEach(item => {
            item.render(context, x, offsetY);
            offsetY += 20 + (this.config.spacing || 5); // Adjust spacing as needed
        });
    }
}

export class Row {
    constructor(columns) {
        this.columns = columns;
    }

    render(context, x, y) {
        let offsetX = x;
        this.columns.forEach(column => {
            column.render(context, offsetX, y);
            offsetX += column.config.minWidth + (column.config.spacing || 5); // Adjust spacing as needed
        });
    }
}

export class Panel {
    constructor(rows) {
        this.rows = rows;
    }

    render(context, x, y) {
        let offsetY = y;
        this.rows.forEach(row => {
            row.render(context, x, offsetY);
            offsetY += 100; // Adjust row height as needed
        });
    }
}
