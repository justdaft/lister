/// <reference path='../typings/all.d.ts'/>

import {Component, View, OnInit, EventEmitter, OnChanges, Input} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor, NgIf, NgClass} from 'angular2/common';
import {MeteorComponent} from 'angular2-meteor';
import {TODOS_COLLECTION, LISTS_COLLECTION} from '../lib/collections';

@Component({
  selector: 'todo-component'
})
@View({
    templateUrl: './client/templates/todo-component.html',
  directives: [NgClass]
})
export class TodoComponent extends MeteorComponent {
  @Input() todo: any;
@Input() _listId: any;

  setChecked(checked) {
    this.call('setChecked', this.todo._id, checked);
  };

  deleteTodo() {
  this.call('deleteTodo', this.todo._id);
  LISTS_COLLECTION.update(this._listId, { $inc: { incompleteCount: -1 } });
  this.todoName = '';
}


  // setAccess() {
  //   this.call('setPrivate', this.todo._id,
  //     !this.todo.private);
  // }
  //
  // deleteTask() {
  //   this.call('deleteTask', this.todo._id);
  // }
}
