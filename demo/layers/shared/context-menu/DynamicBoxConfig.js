export default class DynamicBoxConfig {
    constructor() {
        this.borderBox = {
            color: 'rgba(255, 255, 255, 1)',
            borderColor: 'black',
            borderWidth: 2,
            padding: 5,
        };

        this.mainBox = {
            color: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'black',
            borderWidth: 2,
            padding: 10,
        };

        this.itemBox = {
            color: 'rgba(255, 255, 255, 1)',
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            spacing: 3,
            textColor: 'black',
            fontSize: 14,
            font: 'Arial'
        };
    }
}
