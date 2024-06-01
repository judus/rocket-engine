export default class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(task, taskName, frequency = 1 / 60, priority = 0) {
        this.tasks.push({task, name: taskName, frequency, counter: 0, priority});
        this.tasks.sort((a, b) => b.priority - a.priority);
        console.log(`Task '${taskName}' added with priority ${priority} and frequency ${frequency}`);
    }

    runTasks(deltaTime, ...args) {
        this.tasks.forEach(taskInfo => {
            taskInfo.counter += deltaTime;
            if(taskInfo.counter >= taskInfo.frequency) {
                try {
                    taskInfo.task(deltaTime, ...args);
                } catch(error) {
                    console.error(`Error running task '${taskInfo.name}': ${error}`);
                }
                taskInfo.counter = 0;
            }
        });
    }

    adjustTaskFrequency(task, newFrequency) {
        const taskInfo = this.tasks.find(t => t.task === task);
        if(taskInfo) {
            taskInfo.frequency = newFrequency;
            console.log(`Task '${taskInfo.name}' frequency adjusted to ${newFrequency}`);
        }
    }

    removeTask(task) {
        const taskInfo = this.tasks.find(t => t.task === task);
        if(taskInfo) {
            this.tasks = this.tasks.filter(t => t.task !== task);
            console.log(`Task '${taskInfo.name}' removed`);
        }
    }
}
