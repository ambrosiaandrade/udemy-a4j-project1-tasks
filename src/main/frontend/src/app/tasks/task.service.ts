import {HttpClient} from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";
import {Task} from "app/tasks/task.model";

// Anytime we use dependency injection in our service we need to add another decorator
@Injectable()
export class TaskService {

    onTaskAdded = new EventEmitter<Task>();

    constructor(private http: HttpClient) {

    }

    public getTasks(){
        // In here we will reach out to Spring boot to fetch our data
        // We need a component from angular to do so, HTTP component in which is passed at the constructor
        return this.http.get("/api/tasks");
    }

    public saveTask(task: Task, checked: boolean){
        task.completed = checked;
        return this.http.post("/api/tasks/save", task);
    }

    public addTask(task: Task){
        return this.http.post("/api/tasks/save", task);
    }

}
