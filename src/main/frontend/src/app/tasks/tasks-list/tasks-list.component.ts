import { Component, OnInit } from '@angular/core';
import {Task} from "../task.model";
import {TaskService} from "../task.service";

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

    tasks: Task[] = [];

    constructor(private taskService: TaskService) { }

    // We are going to use the service to call it to  our Spring boot application
    // and get the actual list of taks

    ngOnInit(): void {
        // This is static!
        //this.tasks.push(new Task(1, "Task 1", true, "05/05/2021"))
        //this.tasks.push(new Task(2, "Task 2", true, "06/05/2021"))
        //this.tasks.push(new Task(3, "Task 3", false, "08/05/2021"))

        // Calling a service class -- task.service.ts
        // Also it was created a file -- proxy-config.json
        // at the package.json modify as the line below
        // "start": "ng serve --proxy-config proxy-config.json",
        // so now when the "/api" is at the url it will proxy to the localhost:8080 in which is the spring boot
        // use at he command line the npm start instead of ng serve!

        this.taskService.getTasks()
            .subscribe(
                (tasks: any[]) => {
                    this.tasks = tasks
                },
                (error) => console.log(error)
            );
        this.taskService.onTaskAdded.subscribe(
            (task: Task) => this.tasks.push(task)
        );

    }

    getDueDateLabel(task: Task){
        return task.completed ? 'badge-success' : 'badge-primary';
    }

    onTaskChange(event, task){
        this.taskService.saveTask(task, event.target.checked).subscribe();
        // console.log("task has changed");
    }

}
