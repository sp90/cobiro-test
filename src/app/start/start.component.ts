import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  loginCustomer: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginCustomer = this.fb.group({
      email: ['work@nomis.dk', [Validators.required, Validators.email]],
      password: ['testtest', [Validators.required, Validators.minLength(2)]]
    });
  }

  login() {
    //
  }
}

  // getTodos() {
  //   this.Todos.get()
  //     .subscribe((data: Todo[]) => {
  //       console.log(data)

  //       this.todos = data
  //     })
  // }

  // createTodo() {
  //   this.Todos.create(this.todoForm.value)
  //     .subscribe((data: Todo) => {
  //       this.todos.push(data)
  //     })
  // }

  // updateTodo(todo: Todo) {
  //   // Update todo
  //   this.Todos.update(todo._id, todo)
  //     .subscribe((data: Todo) => {
  //       console.log(data)
  //     })
  // }

  // deleteTodo(id: string, index: number) {
  //   this.Todos.delete(id)
  //     .subscribe((data: Todo) => {
  //       console.log(data)

  //       _.pullAt(this.todos, index)
  //     })
  // }
