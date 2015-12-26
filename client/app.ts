/// <reference path='../typings/all.d.ts'/>

import {Component, View, provide, enableProdMode, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {NgFor, NgIf} from 'angular2/common';
import {bootstrap} from 'angular2-meteor';

import {MeteorComponent} from 'angular2-meteor';
import {LISTS_COLLECTION} from '../lib/collections';
enableProdMode();

@Component({
  selector: 'app'
})
@View({
  templateUrl: './client/templates/app.html',
  directives: [FORM_DIRECTIVES, NgFor, NgIf]
})
export class AppComponent extends MeteorComponent {
  lists: any;

  OnInit() {
    this.lists = LISTS_COLLECTION.find({});
  }

  constructor() {
    super();
    this.lists = LISTS_COLLECTION.find({});
    // this.subscribe('lists', () => {
    //     this.lists = PROJECTS_COLLECTION.find({});
    // }, true);
  }
}

bootstrap(AppComponent);
