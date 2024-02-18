export class Task {
    title: string;
    description: string;
    assignTo: any[];
    dueDate: string;
    category: string;
    subtask: any[];
    prio: number;
    processingStatus: number;

    constructor(obj?: any){
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.assignTo = obj ? obj.assignTo : [];
        this.dueDate = obj ? obj.dueDate: '';
        this.category = obj ? obj.category : '';
        this.subtask = obj ? obj.subtask : '';
        this.prio = obj ? obj.prio : 0;
        this.processingStatus = obj ? obj.processingStatus : 0;
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
            processingStatus: this.processingStatus
        }
    }

}