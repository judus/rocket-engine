export default class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(task, frequency = 1, priority = 0) {
        this.tasks.push({task, frequency, counter: 0, priority});
        this.tasks.sort((a, b) => b.priority - a.priority);
        console.log(`Task added with priority ${priority} and frequency ${frequency}`);
    }

    runTasks(deltaTime) {
        this.tasks.forEach(taskInfo => {
            taskInfo.counter += deltaTime;
            if(taskInfo.counter >= taskInfo.frequency) {
                try {
                    taskInfo.task(deltaTime);
                } catch(error) {
                    console.error(`Error running task: ${error}`);
                }
                taskInfo.counter = 0;
            }
        });
    }

    adjustTaskFrequency(task, newFrequency) {
        const taskInfo = this.tasks.find(t => t.task === task);
        if(taskInfo) {
            taskInfo.frequency = newFrequency;
            console.log(`Task frequency adjusted to ${newFrequency}`);
        }
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t.task !== task);
        console.log('Task removed');
    }
}
