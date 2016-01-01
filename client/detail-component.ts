/// <reference path='../typings/all.d.ts'/>

import {Component, View, OnInit, EventEmitter, OnChanges, Input} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor, NgIf} from 'angular2/common';
import {MeteorComponent} from 'angular2-meteor';
import {TODOS_COLLECTION, LISTS_COLLECTION} from '../lib/collections';
import {TodoComponent} from './todo-component';

@Component({
  selector: 'detail-component'
})
@View({
  templateUrl: './client/templates/detail-component.html',
  directives: [FORM_DIRECTIVES, NgFor, NgIf, TodoComponent]
})

export class DetailComponent extends MeteorComponent implements OnChanges {
  @Input() list: any;
  todos: any;
  _listId: string;
  todoName: string;
  todo: string;

  ngOnChanges(changes: { [propName: string]: any }) {
    if (this.list) {
      this._listId = changes["list"].currentValue._id;
      // this.subscribe(`tasksPub`, id, () => {
      //   this.tasks = TasksCollection.find({ projectId: id });
      //   console.log(this.tasks);
      // });
      this.autorun(() => {
        this.todos = TODOS_COLLECTION.find({ listId: this._listId });
      }, true);
      console.log("ngOnChanges - list = " + changes["list"].currentValue._id);
    }
  }

  deleteList(list: any) {
    this.call('deleteList', list._id);
    this.call('deleteTodos', list._id);
  }

  addTodo(todoName: string) {
    if (!todoName) {
      return;
    }
    this.call('addTodo', todoName, this.list._id );
    this.todoName = '';
    console.log('inserted: ');
  }

  setChecked(checked) {
    this.call('setChecked', this.todo._id,
      checked);
  }

  get todoCount() {
    return TODOS_COLLECTION.find({
      checked: false
    }).count();
  };

  constructor() {
    super();


  }
}
