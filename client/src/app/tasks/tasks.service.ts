import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class TasksService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandlerError('TaskService');
    }

    getTasks(): Observable<Task[]> {
        return this.http
        .get<Task[]>('api/task')
        .pipe(catchError(this.handleError('getTasks', [])));
    }

    addTask(task: Task): Observable<Task> {
        return this.http
        .post<Task>('api/task', task)
            .pipe(catchError(this.handleError('addTasks', task)));
    }

    deleteTask(id: number): Observable<{}> {
        const url = `api/tasks/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteTasks')));
    }

    updateTask(task: Task): Observable<Task> {
        return this.http
            .put<Task>(`api/task/${task._id}`, task)
            .pipe(catchError(this.handleError('updateTasks', task)));
    }
}
