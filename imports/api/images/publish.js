import { Meteor } from 'meteor/meteor';
import { Images } from './collection';
 
if (Meteor.isServer) {
  // Meteor.publish('thumbs', function(ids) {
  //   return Thumbs.find({
  //     originalStore: 'images',
  //     originalId: {
  //       $in: ids
  //     }
  //   });
  // });
 
  Meteor.publish('images', function() {
    return Images.find({});
  });
}