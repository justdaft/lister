/// <reference path='../typings/all.d.ts'/>

export let LISTS_COLLECTION = new Mongo.Collection<any>('lists');

export let TODOS_COLLECTION = new Mongo.Collection<any>('todos');
