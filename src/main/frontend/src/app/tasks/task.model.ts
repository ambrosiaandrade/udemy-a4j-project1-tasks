export class Task {
    public id: number;
    public name: string;
    public completed: boolean;
    public dueDate: string;

    // When this is linked with spring boot the id below won't be necessary
    constructor(name: string, completed: boolean, dueDate: string ){
        this.name = name;
        this.completed = completed;
        this.dueDate = dueDate;
    }
}
