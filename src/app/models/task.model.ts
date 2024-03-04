export class Task {
    title: string;
    description: string;
    assignTo: any[];
    dueDate: string;
    category: string;
    subtask: any[];
    prio: number;
    processingStatus: number;
    id: number;


    constructor(obj?: any){
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.assignTo = obj ? obj.assignTo : [];
        this.dueDate = obj ? obj.dueDate: '';
        this.category = obj ? obj.category : '';
        this.subtask = obj ? obj.subtask : '';
        this.prio = obj ? obj.prio : 0;
        this.processingStatus = obj ? obj.processingStatus : 0;
        this.id = obj? obj.id : 0;
    }


    createTaskObject(){
        return {
            title: this.title,
            description: this.description,
            assignTo: this.assignTo,
            dueDate: this.dueDate,
            category: this.category,
            subtask: this.subtask,
            prio: this.prio,
            processingStatus: this.processingStatus,
            id: this.id,
        }
    }

    setTaskCardData(task: any){
        this.title = task.title;
        this.description = task.description;
        this.assignTo = task.assigned_to;
        this.dueDate = task.due_date;
        this.category = task.category;
        this.subtask = task.subtask;
        this.prio = task.prio;
        this.processingStatus = task.processing_status;
        this.id = task.id;
    }

    createTaskListItem(){
        return {
            title: this.title,
            description: this.description,
            assigned_to: this.assignTo,
            due_date: this.dueDate,
            category: this.category,
            subtask: this.subtask,
            prio: this.prio,
            processing_status: this.processingStatus,
            id: this.id,
        }
    }
}