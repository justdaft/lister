/// <reference path='../typings/all.d.ts'/>

import {Component, View, provide, enableProdMode, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {NgFor, NgIf} from 'angular2/common';


import {MeteorComponent} from 'angular2-meteor';
import {LISTS_COLLECTION, TODOS_COLLECTION} from '../lib/collections';



@Component({
  selector: 'lists-show'
})
@View({
  templateUrl: './client/templates/lists-show.html',
  directives: [FORM_DIRECTIVES, NgFor, NgIf]
})
export class ListsShowComponent extends MeteorComponent {
  todos: any;

  OnInit() {
    this.todos = TODOS_COLLECTION.find({});
  }

  constructor() {
    super();
    this.todos = TODOS_COLLECTION.find({});
    // this.subscribe('lists', () => {
    //     this.lists = PROJECTS_COLLECTION.find({});
    // }, true);
  }
}
