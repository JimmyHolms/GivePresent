import { Meteor } from 'meteor/meteor';
import { Wishes } from './collection';

if (Meteor.isServer) {
  Meteor.publish('wishes', function () {
    return Wishes.find({});
  });
}