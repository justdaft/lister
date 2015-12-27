/// <reference path='../typings/all.d.ts'/>

import {Component, View, provide, enableProdMode, OnInit, EventEmitter, Output} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor, NgIf} from 'angular2/common';
import {bootstrap, MeteorComponent} from 'angular2-meteor';
import {LISTS_COLLECTION, TODOS_COLLECTION} from '../lib/collections';
import {DetailComponent} from './detail-component';
import {MasterComponent} from './master-component';

enableProdMode();

@Component({
  selector: 'app'
})
@View({
  templateUrl: './client/templates/app.html',
  directives: [FORM_DIRECTIVES, NgFor, NgIf, DetailComponent, MasterComponent]
})
export class AppComponent extends MeteorComponent {
  lists: any;
  todos: any;
  list: any;
  OnInit() {
    this.lists = LISTS_COLLECTION.find({});
    this.todos = TODOS_COLLECTION.find({});
  }

  onSelect(list: any) {
    // this.selectedList = list;
    console.log('list: ' + list._id);
    Session.set('CurrentListId', list._id);
   }

  // setCurrentList(list){
  //   this.myEvent.emit(list);
  //   console.log('list: ' + list._id);
  //   Session.set('CurrentListId', list._id);
  // }

  constructor() {
    super();
    this.lists = LISTS_COLLECTION.find({});
    this.todos = TODOS_COLLECTION.find({});

    // this.subscribe('lists', () => {
    //     this.lists = PROJECTS_COLLECTION.find({});
    // }, true);
  }
}

bootstrap(AppComponent);
