/// <reference path='../typings/all.d.ts'/>

import {Component, View, OnInit, EventEmitter, OnChanges, Input, Output} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {NgFor, NgIf} from 'angular2/common';
import {MeteorComponent} from 'angular2-meteor';
import {LISTS_COLLECTION} from '../lib/collections';

@Component({
  selector: 'master-component'
})
@View({
  templateUrl: './client/templates/master-component.html',
  directives: [FORM_DIRECTIVES, NgFor, NgIf]
})

export class MasterComponent extends MeteorComponent {
 @Input() selected: any;
 @Output() selectedList: EventEmitter<any> = new EventEmitter();
 @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  lists: any;

  OnInit() {
    this.lists = LISTS_COLLECTION.find({});
    console.log('MasterComponent:');
  };

  onClick(list) {
    this.selectedList.next(list);
    console.log('MasterComponent:' + list._id);
  };



// clickNewList(name: string){
//   let list = {
//     name: name,
//     incompleteCount: 0,
//   }
//   let result = LISTS_COLLECTION.insert(list);
//   console.log('inserted: ' + result);
//
// }
addList(listName: string) {
  var id = LISTS_COLLECTION.insert({
    name: listName,
    incompleteCount: 0,
  });
  console.log('inserted: ' + id);
}

// addList(name: string){
//     var list = {name: name, incompleteCount: 10};
//     var id = LISTS_COLLECTION.insert(list);
//     console.log('inserted: ' + id);
//   }

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
    this.autorun(() => {
      this.lists = LISTS_COLLECTION.find({});
    }, true);

  }
}
