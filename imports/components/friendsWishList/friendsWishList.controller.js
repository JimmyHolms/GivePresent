import { Wishes } from '../../api/wishes';
import { Meteor } from 'meteor/meteor';

export class FriendsWishListCtrl {
  static get $inject () {
    return ['$scope', '$reactive', '$stateParams'];
  }

  constructor($scope, $reactive, $stateParams) {
    $scope.viewModel(this);
    
    $reactive(this).attach($scope);

    this.subscribe('wishes');
    this.subscribe('userData');

    this.helpers({
      wishes() {
        return Wishes.find({
          owner: $stateParams.userId,
          received: false
        }, {
          sort: {
            createdAt: -1
          }
        });
      },
      friend() {
        return Meteor.users.find({
          _id: $stateParams.userId
        }).fetch()[0];
      }
    });
  }
}