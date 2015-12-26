/// <reference path='../typings/angular2-meteor.d.ts' />


import {loadTestData} from 'server/test_data';
import {LISTS_COLLECTION, TODOS_COLLECTION} from '../lib/collections';



// export * from './pubs';

Meteor.startup(function() {
  loadTestData();
});
