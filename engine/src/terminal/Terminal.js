export default class Terminal {
    constructor(logElementId, progressElementId, inputElementId) {
        this.logElement = document.getElementById(logElementId);
        this.progressBar = document.getElementById(progressElementId);
        this.commandInput = document.getElementById(inputElementId);
        this.logEntries = new Map();

        this.commandInput.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                const command = this.commandInput.value.trim();
                this.commandInput.value = '';
                this.executeCommand(command);
            }
        });
    }

    log(message, type = 'info', status = null, id = null) {
        if(id && this.logEntries.has(id)) {
            const logEntry = this.logEntries.get(id);
            logEntry.textContent = `${message} ${status ? `(${status})` : ''}`;
            logEntry.className = `log-entry ${type}`;
        } else {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${type}`;
            logEntry.textContent = `${message} ${status ? `(${status})` : ''}`;
            if(id) {
                this.logEntries.set(id, logEntry);
            }
            this.logElement.appendChild(logEntry);
            this.logElement.scrollTop = this.logElement.scrollHeight;
        }
    }

    updateProgress(progress) {
        if(this.progressBar) {
            this.progressBar.style.width = `${progress * 100}%`;
        }
    }

    executeCommand(command) {
        try {
            const result = eval(command);
            this.log(`> ${command}`, 'command');
            if(result !== undefined) {
                this.log(result.toString(), 'result');
            }
        } catch(error) {
            this.log(`Error: ${error.message}`, 'error');
        }
    }
}
