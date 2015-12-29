/// <reference path='../typings/all.d.ts'/>

export let LISTS_COLLECTION = new Mongo.Collection<any>('lists');

export let TODOS_COLLECTION = new Mongo.Collection<any>('todos');


Meteor.methods({
  deleteTodo: function(todoId) {
    TODOS_COLLECTION.remove(todoId);
  },
  setChecked: function(todoId, setChecked) {
    let todo = TODOS_COLLECTION.findOne(todoId);
    TODOS_COLLECTION.update(todoId, {
      $set: {checked: setChecked}
    });
  }
});
