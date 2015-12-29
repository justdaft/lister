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
    this.todos = '';
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

  addTodo(todoName: string) {
    if (!todoName) {
      return;
    }
    TODOS_COLLECTION.insert({
      listId: this._listId,
      text: todoName,
      checked: false,
      createdAt: new Date()
    });
    LISTS_COLLECTION.update(this._listId, { $inc: { incompleteCount: 1 } });
    this.todoName = '';
    console.log('inserted: ');
  }

  setChecked(checked) {
    this.call('setChecked', this.todo._id,
      checked);
  }

  // OnInit() {
  //   if (this.list) {
  //     let listId = this.list._id;
  //     this.todos = TODOS_COLLECTION.find({ listId: listId });
  //     console.log('lists-show: ' + listId);
  //   }
  //   this.todos = TODOS_COLLECTION.find({});
  // };

  SaveList(list, template) {
    // Session.set(EDITING_KEY, false);
    // Lists.update(list._id, { $set: { name: template.$('[name=name]').val() } });
  };

  DeleteList(list) {
    // ensure the last public list cannot be deleted.
    // if (!list.userId && Lists.find({ userId: { $exists: false } }).count() === 1) {
    //   return alert('Sorry, you cannot delete the final public list!');
    // }
  };

  ClickEditList(event, template) {
    //  editList(this, template);
  };

  ClickToggleListPrivacy(event, template) {
    //  toggleListPrivacy(this, template);
  };

  ClickDeleteList(event, template) {
    //  deleteList(this, template);
  };

  constructor() {
    super();


  }
}
