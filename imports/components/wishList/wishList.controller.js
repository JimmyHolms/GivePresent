import { Wishes } from '../../api/wishes';
import { Meteor } from 'meteor/meteor';

export class WishListCtrl {
  static get $inject () {
    return ['$scope', '$reactive', 'alternativeData'];
  }

  constructor($scope, $reactive, alternativeData) {
    $scope.viewModel(this);
    
    $reactive(this).attach($scope);

    this.subscribe('wishes');

    this.alternativeData = alternativeData;

    this.alternativeWishes = alternativeData.getWishes();

    this.helpers({
      wishes() {
        return Wishes.find({
          owner: Meteor.userId()
        }, {
          sort: {
            createdAt: -1
          }
        });
      },
      receivedWishes() {
        return Wishes.find({
          owner: Meteor.userId(),
          received: true
        }, {
          sort: {
            createdAt: -1
          }
        });
      }
    });
  }

  remove(wish) {
    if (!Meteor.status().connected) {
      return;
    }
    
    Dialogs.confirm('Are you sure you want to delete?', this.$bindToContext((res) => {
      if (res === 1) {
        // OK
        if (Meteor.userId()) {
          Wishes.remove(wish._id);
        } else {
          this.alternativeData.removeWish(wish._id);
          this.alternativeWishes = this.alternativeData.getWishes();
        }
      } else {
        // Cancel
      }
    }));
  }

  getWishes() {
    if (Meteor.userId()) {
      return this.wishes;
    } else {
      return this.alternativeWishes;
    }
  }

  markAsReceived(wish) {
    if (Meteor.userId()) {
      Wishes.update({
        _id: wish._id
      }, {
        $set: {
          received: true
        }
      });
    }
  }

  markAsNotReceived(wish) {
    if (Meteor.userId()) {
      Wishes.update({
        _id: wish._id
      }, {
        $set: {
          received: false,
          giftGiver: null
        }
      });
    }
  }
}