/// <reference path='../typings/all.d.ts'/>

export let LISTS_COLLECTION = new Mongo.Collection<any>('lists');

export let TODOS_COLLECTION = new Mongo.Collection<any>('todos');


Meteor.methods({
  addTodo: function(text: string, listId: string) {
    TODOS_COLLECTION.insert({
        listId: listId,
        text: text,
        checked: false,
        private: false,
        createdAt: new Date()
      });
      LISTS_COLLECTION.update(listId, {
          $inc: { incompleteCount: 1 }
        });
  },

  deleteList: function(listId) {
    LISTS_COLLECTION.remove(listId);
  },

  deleteTodos: function(listId) {
    TODOS_COLLECTION.remove({listId: listId});
  },

  deleteTodo: function(todoId) {
    TODOS_COLLECTION.remove(todoId);
  },

  setCheckedTodo: function(todoId, setChecked) {
      let todo = TODOS_COLLECTION.findOne(todoId);
      TODOS_COLLECTION.update(todoId, {
        $set: { checked: setChecked }
      });
  }
});
